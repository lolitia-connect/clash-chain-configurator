export const SteamDownloadServerRule: RuleDefinition = {
  name: 'LoliTiaConnect-Steam-download-server',
  description: 'Steam 下载服务器规则，匹配 Steam 下载服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'text',
    url: 'https://cdn.jsdmirror.com/gh/lolitia-connect/rules@main/Steam/download-server.list',
    interval: 86400,
  },
  group: 'Steam 下载服务器',
  parentGroup: 'Steam',
  proxyPreference: 'direct-first',
};
