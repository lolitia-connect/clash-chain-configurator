export const GoogleCNRule: RuleDefinition = {
  name: 'ACL4SSR-GoogleCN',
  description: 'GoogleCN 规则集，匹配 Google CN 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'text',
    url: 'https://cdn.jsdmirror.com/gh/ACL4SSR/ACL4SSR@master/Clash/Ruleset/GoogleCN.list',
    interval: 86400,
  },
  group: 'Google CN',
  parentGroup: '🔍 Google',
  proxyPreference: 'direct-first',
};
