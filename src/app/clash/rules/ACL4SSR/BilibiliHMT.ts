export const BilibiliHMTRule: RuleDefinition = {
  name: 'ACL4SSR-BilibiliHMT',
  description: '匹配 Bilibili 港澳台服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'text',
    url: 'https://cdn.jsdmirror.com/gh/ACL4SSR/ACL4SSR@master/Clash/Ruleset/BilibiliHMT.list',
    interval: 86400,
  },
  group: 'Bilibili 港澳台',
  parentGroup: 'Bilibili',
  proxyPreference: 'outbound-first',
};
