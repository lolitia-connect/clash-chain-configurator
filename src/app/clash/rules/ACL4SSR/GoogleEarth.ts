export const GoogleEarthRule: RuleDefinition = {
  name: 'ACL4SSR-GoogleEarth',
  description: 'GoogleEarth 规则集，匹配 Google Earth 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/ACL4SSR/ACL4SSR@master/Clash/Ruleset/GoogleEarth.list',
    interval: 86400,
  },
  group: '🔍 Google',
  proxyPreference: 'outbound-first',
};
