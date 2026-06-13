export const MicrosoftRule: RuleDefinition = {
  name: 'PerfectPanel-Microsoft',
  description: 'Microsoft 规则集，匹配 Microsoft 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/Microsoft/Microsoft.yaml',
    interval: 86400,
  },
  group: '🪟 Microsoft',
  proxyPreference: 'direct-first',
};
