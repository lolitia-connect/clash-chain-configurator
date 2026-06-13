export const GithubRule: RuleDefinition = {
  name: 'Github',
  description: 'Github 规则集，匹配 GitHub 相关服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/GitHub/GitHub.yaml',
    interval: 86400,
  },
  group: '🪟 Microsoft',
  proxyPreference: 'direct-first',
};
