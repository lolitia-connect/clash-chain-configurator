export const BingRule: RuleDefinition = {
  name: 'blackmatrix7@ios_rule_script-Bing',
  description: 'Bing 规则集，匹配 Bing 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'text',
    url: 'https://cdn.jsdmirror.com/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Bing/Bing.list',
    interval: 86400,
  },
  group: 'Bing',
  parentGroup: '🪟 Microsoft',
  proxyPreference: 'direct-first',
};
