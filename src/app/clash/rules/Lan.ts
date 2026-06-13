export const LanRule: RuleDefinition = {
  name: 'Lan',
  description: 'Lan 规则集，匹配局域网流量。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/Lan/Lan.yaml',
    interval: 86400,
  },
  group: '🎯 Direct',
  proxyPreference: 'direct-first',
};
