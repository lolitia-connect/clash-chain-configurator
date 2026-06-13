export const GlobalMediaRule: RuleDefinition = {
  name: 'GlobalMedia',
  description: 'GlobalMedia 规则集，用于合并多媒体流量。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/GlobalMedia/GlobalMedia_Classical_No_Resolve.yaml',
    interval: 86400,
  },
  group: '📺 GlobalMedia',
  proxyPreference: 'outbound-first',
};
