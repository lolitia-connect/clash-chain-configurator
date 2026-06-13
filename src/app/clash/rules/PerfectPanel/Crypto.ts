export const CryptoRule: RuleDefinition = {
  name: 'PerfectPanel-Crypto',
  description: 'Crypto 规则集，匹配加密货币服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/Crypto/Crypto.yaml',
    interval: 86400,
  },
  group: '🪙 Crypto',
  proxyPreference: 'outbound-first',
};
