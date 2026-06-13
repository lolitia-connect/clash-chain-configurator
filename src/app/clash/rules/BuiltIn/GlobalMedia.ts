export const MediaRule: RuleDefinition = {
  name: 'GlobalMedia',
  description: '📺 GlobalMedia 媒体代理组占位，无实际订阅规则。',
  provider: {
    type: 'inline',
    behavior: 'classical',
    payload: [],
  },
  group: '📺 GlobalMedia',
  proxyPreference: 'outbound-first',
};