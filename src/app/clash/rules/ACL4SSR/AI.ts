export const AIRule: RuleDefinition = {
  name: 'ACL4SSR-AI',
  description: '匹配 AI 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'text',
    url: 'https://cdn.jsdmirror.com/gh/ACL4SSR/ACL4SSR@master/Clash/Ruleset/AI.list',
    interval: 86400,
  },
  group: '🤖 AI',
  proxyPreference: 'outbound-first',
};
