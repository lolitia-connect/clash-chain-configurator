import { ruleDefinitions as perfectPanelRuleDefinitions } from './rules/perfect-panel';
import { ruleDefinitions as acl4ssrRuleDefinitions } from './rules/acl4ssr';
import { ruleDefinitions as builtInRuleDefinitions } from './rules/built-in';

export const defaultRuleDefinitions: RuleDefinition[] = [
  ...builtInRuleDefinitions,
  ...perfectPanelRuleDefinitions,
  ...acl4ssrRuleDefinitions,
];

export const defaultRuleProviders: Record<string, RuleProvider> = defaultRuleDefinitions.reduce(
  (providers, rule) => {
    providers[rule.name] = rule.provider;
    return providers;
  },
  {} as Record<string, RuleProvider>,
);

export const defaultRuleSets: string[] = defaultRuleDefinitions.map(
  (rule) => `RULE-SET, ${rule.name}, ${rule.group}`,
);
