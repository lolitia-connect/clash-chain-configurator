export const CopilotRule: RuleDefinition = {
  name: 'Copilot',
  description: 'Copilot 规则集，匹配 Copilot 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/Copilot/Copilot.yaml',
    interval: 86400,
  },
  group: '🤖 AI',
  proxyPreference: 'outbound-first',
};
