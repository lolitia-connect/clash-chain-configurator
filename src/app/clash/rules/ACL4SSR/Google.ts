export const GoogleRule: RuleDefinition = {
  name: 'ACL4SSR-Google',
  description: 'Google 规则集，匹配 Google 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'text',
    url: 'https://cdn.jsdmirror.com/gh/ACL4SSR/ACL4SSR@master/Clash/Ruleset/Google.list',
    interval: 86400,
  },
  group: '🔍 Google',
  proxyPreference: 'outbound-first',
};
