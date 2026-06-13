export const HBORule: RuleDefinition = {
  name: 'HBO',
  description: 'HBO 规则集，匹配 HBO 相关服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/HBO/HBO.yaml',
    interval: 86400,
  },
  group: '📺 GlobalMedia',
  proxyPreference: 'outbound-first',
};
