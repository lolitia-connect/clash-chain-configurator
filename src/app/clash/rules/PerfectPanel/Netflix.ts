export const NetflixRule: RuleDefinition = {
  name: 'PerfectPanel-Netflix',
  description: 'Netflix 规则集，匹配 Netflix 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/Netflix/Netflix.yaml',
    interval: 86400,
  },
  group: 'Netflix',
  parentGroup: '📺 GlobalMedia',
  proxyPreference: 'outbound-first',
};
