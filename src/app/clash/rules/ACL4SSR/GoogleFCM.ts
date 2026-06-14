export const GoogleFCMRule: RuleDefinition = {
  name: 'ACL4SSR-GoogleFCM',
  description: 'GoogleFCM 规则集，匹配 Firebase Cloud Messaging 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/ACL4SSR/ACL4SSR@master/Clash/Ruleset/GoogleFCM.list',
    interval: 86400,
  },
  group: '🔍 Google',
  proxyPreference: 'outbound-first',
};
