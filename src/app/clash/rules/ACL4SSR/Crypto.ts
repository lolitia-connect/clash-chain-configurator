export const CryptoRule: RuleDefinition = {
  name: 'ACL4SSR-Crypto',
  description: '匹配加密货币相关服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'text',
    url: 'https://cdn.jsdmirror.com/gh/ACL4SSR/ACL4SSR@master/Clash/Ruleset/Crypto.list',
    interval: 86400,
  },
  group: '🪙 Crypto',
  proxyPreference: 'outbound-first',
};
