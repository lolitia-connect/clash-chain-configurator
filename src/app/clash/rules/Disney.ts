export const DisneyRule: RuleDefinition = {
  name: 'Disney',
  description: 'Disney 规则集，匹配 Disney 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/Disney/Disney.yaml',
    interval: 86400,
  },
  group: '📺 GlobalMedia',
  proxyPreference: 'outbound-first',
};
