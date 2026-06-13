export const TelegramRule: RuleDefinition = {
  name: 'PerfectPanel-Telegram',
  description: 'Telegram 规则集，匹配 Telegram 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/Telegram/Telegram_No_Resolve.yaml',
    interval: 86400,
  },
  group: '📟 Telegram',
  proxyPreference: 'outbound-first',
};
