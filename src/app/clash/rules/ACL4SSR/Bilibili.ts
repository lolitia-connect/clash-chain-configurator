export const BilibiliRule: RuleDefinition = {
  name: 'ACL4SSR-Bilibili',
  description: '匹配 Bilibili 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'text',
    url: 'https://cdn.jsdmirror.com/gh/ACL4SSR/ACL4SSR@master/Clash/Ruleset/Bilibili.list',
    interval: 86400,
  },
  group: 'Bilibili',
  parentGroup: '📺 Media',
  proxyPreference: 'direct-first',
};
