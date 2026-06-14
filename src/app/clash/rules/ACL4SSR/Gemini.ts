export const GeminiRule: RuleDefinition = {
  name: 'ACL4SSR-Gemini',
  description: 'Gemini 规则集，匹配 Gemini 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/ACL4SSR/ACL4SSR@master/Clash/Ruleset/Gemini.list',
    interval: 86400,
  },
  group: '🤖 AI',
  proxyPreference: 'outbound-first',
};
