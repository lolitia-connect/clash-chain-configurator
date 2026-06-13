export const SteamRule: RuleDefinition = {
  name: 'ACL4SSR-Steam',
  description: '匹配 Steam 相关服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'text',
    url: 'https://cdn.jsdmirror.com/gh/ACL4SSR/ACL4SSR@master/Clash/Ruleset/Steam.list',
    interval: 86400,
  },
  group: 'Steam',
  parentGroup: '🎮 Game',
  proxyPreference: 'outbound-first',
};
