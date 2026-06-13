export const ChinaMaxRule: RuleDefinition = {
  name: 'PerfectPanel-ChinaMax',
  description: 'ChinaMax 规则集，匹配中国大陆流量。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/ChinaMax/ChinaMax_Classical_No_Resolve.yaml',
    interval: 86400,
  },
  group: '🇨🇳 China',
  proxyPreference: 'direct-first',
};
