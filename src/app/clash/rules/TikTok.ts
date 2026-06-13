export const TikTokRule: RuleDefinition = {
  name: 'TikTok',
  description: 'TikTok 规则集，匹配 TikTok 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/TikTok/TikTok.yaml',
    interval: 86400,
  },
  group: '📺 GlobalMedia',
  proxyPreference: 'outbound-first',
};
