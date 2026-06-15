export const XboxRule: RuleDefinition = {
  name: 'blackmatrix7@ios_rule_script-Xbox',
  description: 'Xbox 规则集，匹配 Xbox 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'text',
    url: 'https://cdn.jsdmirror.com/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Xbox/Xbox.list',
    interval: 86400,
  },
  group: 'Xbox',
  parentGroup: '🎮 Game',
  proxyPreference: 'direct-first',
};
