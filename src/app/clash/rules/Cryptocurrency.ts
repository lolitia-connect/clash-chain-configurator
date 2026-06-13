export const CryptocurrencyRule: RuleDefinition = {
  name: 'Cryptocurrency',
  description: 'Cryptocurrency 规则集，匹配加密货币服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/Cryptocurrency/Cryptocurrency.yaml',
    interval: 86400,
  },
  group: '🪙 Crypto',
  proxyPreference: 'outbound-first',
};
