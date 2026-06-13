export const GeminiRule: RuleDefinition = {
  name: 'PerfectPanel-Gemini',
  description: 'Gemini 规则集，匹配 Gemini 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/Gemini/Gemini.yaml',
    interval: 86400,
  },
  group: '🤖 AI',
  proxyPreference: 'outbound-first',
};
