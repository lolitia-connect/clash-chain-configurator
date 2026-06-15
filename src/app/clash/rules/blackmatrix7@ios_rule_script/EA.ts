export const EARule: RuleDefinition = {
  name: 'blackmatrix7@ios_rule_script-EA',
  description: 'EA 规则集，匹配 EA 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'text',
    url: 'https://cdn.jsdmirror.com/gh/blackmatrix7/ios_rule_script@master/rule/Clash/EA/EA.list',
    interval: 86400,
  },
  group: 'EA',
  parentGroup: '🎮 Game',
  proxyPreference: 'direct-first',
};
