import { defaultRuleProviders, defaultRuleSets } from './ruleInit';

export const defaultConfig: ClashConfig = {
  mode: 'rule',
  ipv6: true,
  'allow-lan': true,
  'log-level': 'info',
  'unified-delay': true,
  'tcp-concurrent': true,
  'external-controller': '0.0.0.0:9090',
  'proxy-providers': {},
  'rule-providers': defaultRuleProviders,
  proxies: [],
  'proxy-groups': [],
  rules: defaultRuleSets,
  dns: {},
  'url-rewrite': [
    '^https?:\\/\\/(www\\.)?g\\.cn https://www.google.com 302',
    '^https?:\\/\\/(www\\.)?google\\.cn https://www.google.com 302',
  ],
};
