export const ChinaOneKeyLoginRule: RuleDefinition = {
  name: 'ACL4SSR-ChinaOneKeyLogin',
  description: '匹配中国一键登录服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'text',
    url: 'https://cdn.jsdmirror.com/gh/ACL4SSR/ACL4SSR@master/Clash/Ruleset/ChinaOneKeyLogin.list',
    interval: 86400,
  },
  group: '🇨🇳 China',
  proxyPreference: 'direct-first',
};
