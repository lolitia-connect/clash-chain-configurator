import { defaultConfig } from './defaultConfig';
import { defaultRuleDefinitions } from './ruleInit';
import jsyaml from 'js-yaml';

function extractHostname(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

export default class ConfigConfigurator {
  config = { ...defaultConfig } as ClashConfig;

  constructor() {
    this.normalizeConfig();
  }

  private normalizeConfig() {
    if (!this.config || typeof this.config !== 'object') {
      this.config = {} as ClashConfig;
    }

    if (Array.isArray(this.config['proxy-providers'])) {
      this.config['proxy-providers'] = {} as ClashProxyProviders;
    }

    if (!this.config['proxy-providers'] || typeof this.config['proxy-providers'] !== 'object') {
      this.config['proxy-providers'] = {} as ClashProxyProviders;
    }

    if (!Array.isArray(this.config.proxies)) {
      this.config.proxies = [];
    }

    if (!Array.isArray(this.config['proxy-groups'])) {
      this.config['proxy-groups'] = [];
    }

    if (!Array.isArray(this.config.rules)) {
      this.config.rules = [];
    }
  }

  setProviders(providers: ProxyProviderExtend[]) {
    this.normalizeConfig();
    this.config['proxy-providers'] = {} as ClashProxyProviders;

    const entryProviders: string[] = [];
    const landingProviders: string[] = [];
    const providerHosts: string[] = [];

    providers.forEach((x) => {
      const providerConfig: ProxyProvider = {
        type: x.type,
        url: x.url || undefined,
        interval: x.interval,
        payload: x.payloadContent ? (jsyaml.load(x.payloadContent) as ProxyNode[]) : undefined,
      };
      if (x.prefix) {
        providerConfig.override = { 'additional-prefix': x.prefix };
      }
      this.config['proxy-providers'][x.name] = providerConfig;

      if (x.landing) {
        landingProviders.push(x.name);
      } else {
        entryProviders.push(x.name);
      }

      if (x.url) {
        const host = extractHostname(x.url);
        if (host) providerHosts.push(host);
      }
    });

    // 缓存供 setFinalProxyNodes 复用
    this._cachedEntryProviders = entryProviders;
    this._cachedLandingProviders = landingProviders;
    this._cachedProviderHosts = providerHosts;

    this.configure(entryProviders, landingProviders, providerHosts);
  }

  private _cachedEntryProviders: string[] = [];
  private _cachedLandingProviders: string[] = [];
  private _cachedProviderHosts: string[] = [];

  setFinalProxyNodes(entryNodes: ProxyNode[], landingNodes: ProxyNode[]) {
    this.normalizeConfig();
    (this as any)._entryNodes = entryNodes;
    (this as any)._landingNodes = landingNodes;
    // 用缓存的 provider 信息重新生成配置
    this.configure(this._cachedEntryProviders, this._cachedLandingProviders, this._cachedProviderHosts);
  }

  private configure(
    entryProviders: string[],
    landingProviders: string[],
    providerHosts: string[],
  ) {
    const allProviderNames = [
      ...Object.keys(this.config['proxy-providers']),
    ];

    // ── 手动节点 → inline provider ──
    const entryNodes: ProxyNode[] = (this as any)._entryNodes || [];
    const landingNodes: ProxyNode[] = (this as any)._landingNodes || [];

    // 无订阅且无手动节点时跳过
    if (!allProviderNames.length && !entryNodes.length && !landingNodes.length) return;

    // 无入口订阅且无入口手动节点时跳过
    if (!entryProviders.length && !entryNodes.length) return;

    // 无落地订阅且无落地手动节点时跳过
    if (!landingProviders.length && !landingNodes.length) return;

    if (entryNodes.length > 0) {
      this.config['proxy-providers']['Inbound Manual'] = {
        type: 'inline',
        payload: entryNodes,
      } as ProxyProvider;
    }
    if (landingNodes.length > 0) {
      this.config['proxy-providers']['Outbound Manual'] = {
        type: 'inline',
        payload: landingNodes,
      } as ProxyProvider;
    }

    // 刷新 provider 列表（包含新增的 inline）
    const allNames = Object.keys(this.config['proxy-providers']);
    const entryProviderNames = [
      ...entryProviders,
      ...(entryNodes.length > 0 ? ['Inbound Manual'] : []),
    ];
    const landingProviderNames = [
      ...landingProviders,
      ...(landingNodes.length > 0 ? ['Outbound Manual'] : []),
    ];

    // ── Proxy Groups ──
    const groups: ProxyGroup[] = [];

    // 统一的 use 列表
    const inboundUse = entryProviderNames.length > 0 ? entryProviderNames : allNames;
    const outboundUse = landingProviderNames.length > 0 ? landingProviderNames : allNames;
    const sharedUse = landingProviderNames.length > 0 ? landingProviderNames : allNames;

    // 🚇 Inbound：入口选择组（无 dialer-proxy，它是链的起点）
    groups.push({
      name: '🚇 Inbound',
      type: 'select',
      proxies: ['📥 Auto', '🎯 Direct'],
      use: [...inboundUse],
    });

    // 🚀 Outbound：落地选择组，dialer-proxy 链式指向 Inbound
    groups.push({
      name: '🚀 Outbound',
      type: 'select',
      proxies: ['📤 Auto'],
      use: [...outboundUse],
      'dialer-proxy': '🚇 Inbound',
    });

    // 每个 Group 对应一个代理组（按 group 名去重，排除与内置组同名的）
    const builtinNames = new Set([
      '🚇 Inbound', '📥 Auto',
      '🚀 Outbound', '📤 Auto',
      '🎯 Direct', '🐠 Final',
    ]);
    const groupMap = new Map<string, { preference: 'direct-first' | 'outbound-first'; parentGroup?: string }>();
    defaultRuleDefinitions.forEach((rule) => {
      if (!builtinNames.has(rule.group) && !groupMap.has(rule.group)) {
        groupMap.set(rule.group, {
          preference: rule.proxyPreference || 'outbound-first',
          parentGroup: rule.parentGroup,
        });
      }
    });
    groupMap.forEach(({ preference, parentGroup }, groupName) => {
      const baseProxies =
        preference === 'direct-first'
          ? ['🎯 Direct', '🚀 Outbound']
          : ['🚀 Outbound', '🎯 Direct'];

      const proxies = parentGroup ? [parentGroup, ...baseProxies] : baseProxies;

      groups.push({
        name: groupName,
        type: 'select',
        proxies,
        use: [...sharedUse],
        'dialer-proxy': '🚇 Inbound',
      });
    });

    // 🎯 Direct（隐藏组）
    groups.push({ name: '🎯 Direct', type: 'select', proxies: ['DIRECT'], hidden: true });

    // 🐠 Final
    groups.push({
      name: '🐠 Final',
      type: 'select',
      proxies: ['🚀 Outbound', '🎯 Direct'],
      use: [...sharedUse],
      'dialer-proxy': '🚇 Inbound',
    });

    // 📥 Auto：入口自动测速组（hidden，仅通过 Inbound 引用）
    groups.push({
      name: '📥 Auto',
      type: 'url-test',
      use: [...inboundUse],
      url: 'https://www.gstatic.com/generate_204',
      interval: 300,
      hidden: true,
    });

    // 📤 Auto：落地自动测速组（hidden，仅通过 Outbound 引用）
    groups.push({
      name: '📤 Auto',
      type: 'url-test',
      use: [...outboundUse],
      'dialer-proxy': '🚇 Inbound',
      url: 'https://www.gstatic.com/generate_204',
      interval: 300,
      hidden: true,
    });

    this.config['proxy-groups'] = groups;

    // ── Rules ──
    const rules: string[] = [];

    // DOMAIN 直连规则（订阅地址域名）
    providerHosts.forEach((host) => {
      rules.push(`DOMAIN,${host},DIRECT`);
    });

    // RULE-SET 规则
    defaultRuleDefinitions.forEach((rule) => {
      rules.push(`RULE-SET, ${rule.name}, ${rule.group}`);
    });

    // GEOIP + MATCH
    rules.push('GEOIP, CN, 🇨🇳 China');
    rules.push('MATCH, 🐠 Final');

    this.config.rules = rules;
  }

  get content() {
    const {
      dns,
      'proxy-providers': proxyProviders,
      proxies,
      'proxy-groups': proxyGroups,
      'rule-providers': ruleProviders,
      rules,
      ...rest
    } = this.config;

    const parts: string[] = [];

    parts.push(jsyaml.dump(rest, { lineWidth: -1 }));

    if (dns && Object.keys(dns).length > 0) {
      parts.push(jsyaml.dump({ dns }, { lineWidth: -1, flowLevel: 2 }));
    }

    if (proxyProviders && Object.keys(proxyProviders).length > 0) {
      parts.push(
        jsyaml.dump({ 'proxy-providers': proxyProviders }, { lineWidth: -1, flowLevel: 4 }),
      );
    }

    if (proxies && proxies.length > 0) {
      parts.push(jsyaml.dump({ proxies }, { lineWidth: -1, flowLevel: 2 }));
    }

    if (proxyGroups && proxyGroups.length > 0) {
      parts.push(jsyaml.dump({ 'proxy-groups': proxyGroups }, { lineWidth: -1, flowLevel: 2 }));
    }

    if (ruleProviders && Object.keys(ruleProviders).length > 0) {
      parts.push(jsyaml.dump({ 'rule-providers': ruleProviders }, { lineWidth: -1, flowLevel: 4 }));
    }

    if (rules && rules.length > 0) {
      parts.push(jsyaml.dump({ rules }, { lineWidth: -1, flowLevel: 2 }));
    }

    return parts.join('\n');
  }
}
