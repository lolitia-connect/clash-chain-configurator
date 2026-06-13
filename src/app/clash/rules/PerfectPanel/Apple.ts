export const AppleRule: RuleDefinition = {
  name: 'PerfectPanel-Apple',
  description: 'Apple 规则集，匹配 Apple 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/Apple/Apple_Classical_No_Resolve.yaml',
    interval: 86400,
  },
  group: '🍎 Apple',
  proxyPreference: 'direct-first',
};
