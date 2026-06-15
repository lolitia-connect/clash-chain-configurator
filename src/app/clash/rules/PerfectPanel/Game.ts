export const GameRule: RuleDefinition = {
  name: 'PerfectPanel-Game',
  description: 'Game 规则集，匹配游戏服务。',
  provider: {
    type: 'http',
    behavior: 'classical',
    format: 'yaml',
    url: 'https://cdn.jsdmirror.com/gh/perfect-panel/rules/rule/Clash/Game/Game.yaml',
    interval: 86400,
  },
  group: '🎮 Game',
  proxyPreference: 'direct-first',
};
