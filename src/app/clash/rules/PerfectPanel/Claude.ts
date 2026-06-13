export const ClaudeRule: RuleDefinition = {
  name: 'PerfectPanel-Claude',
  description: 'Claude 规则集，匹配 Claude 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/Claude/Claude.yaml',
    interval: 86400,
  },
  group: '🤖 AI',
  proxyPreference: 'outbound-first',
};
