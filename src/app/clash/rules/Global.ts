export const GlobalRule: RuleDefinition = {
  name: 'Global',
  description: 'Global 规则集，匹配国际流量。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/Global/Global_Classical_No_Resolve.yaml',
    interval: 86400,
  },
  group: '🚀 Outbound',
  proxyPreference: 'outbound-first',
};
