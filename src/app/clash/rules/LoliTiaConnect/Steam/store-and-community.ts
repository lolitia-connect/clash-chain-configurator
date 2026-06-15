export const SteamStoreAndCommunityRule: RuleDefinition = {
  name: 'LoliTiaConnect-Steam-store-and-community',
  description: 'Steam 商店和社区规则，匹配 Steam 商店和社区服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'text',
    url: 'https://cdn.jsdmirror.com/gh/lolitia-connect/rules@main/Steam/store-and-community.list',
    interval: 86400,
  },
  group: 'Steam',
  parentGroup: '🎮 Game',
  proxyPreference: 'direct-first',
};
