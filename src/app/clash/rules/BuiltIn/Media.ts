export const MediaRule: RuleDefinition = {
  name: 'CNMedia',
  description: '📺 CNMedia 媒体代理组占位，无实际订阅规则。',
  provider: {
    type: 'inline',
    behavior: 'classical',
    payload: [],
  },
  group: '📺 CNMedia',
  proxyPreference: 'direct-first',
};