export const GoogleRule: RuleDefinition = {
  name: 'PerfectPanel-Google',
  description: 'Google 规则集，匹配 Google 服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/Google/Google_No_Resolve.yaml',
    interval: 86400,
  },
  group: '🔍 Google',
  proxyPreference: 'outbound-first',
};
