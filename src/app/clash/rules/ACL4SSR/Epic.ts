export const EpicRule: RuleDefinition = {
  name: 'ACL4SSR-Epic',
  description: '匹配 Epic Games 相关服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'text',
    url: 'https://cdn.jsdmirror.com/gh/ACL4SSR/ACL4SSR@master/Clash/Ruleset/Epic.list',
    interval: 86400,
  },
  group: 'Epic',
  parentGroup: '🎮 Game',
  proxyPreference: 'outbound-first',
};
