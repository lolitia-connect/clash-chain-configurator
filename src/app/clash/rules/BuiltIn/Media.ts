export const MediaRule: RuleDefinition = {
  name: 'Media',
  description: '📺 Media 媒体代理组占位，无实际订阅规则。',
  provider: {
    type: 'inline',
    behavior: 'classical',
    payload: [],
  },
  group: '📺 Media',
  proxyPreference: 'outbound-first',
};