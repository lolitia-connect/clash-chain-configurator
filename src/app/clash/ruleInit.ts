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

export const defaultRuleSets: string[] = (() => {
  const visited = new Set<string>();
  const sorted: RuleDefinition[] = [];
  function visit(rule: RuleDefinition) {
    if (visited.has(rule.name)) return;
    visited.add(rule.name);
    defaultRuleDefinitions.forEach((r) => {
      if (r.parentGroup === rule.group) visit(r);
    });
    sorted.push(rule);
  }
  defaultRuleDefinitions.forEach((rule) => {
    if (!rule.parentGroup) visit(rule);
  });
  defaultRuleDefinitions.forEach((rule) => visit(rule));
  return sorted.map((rule) => `RULE-SET, ${rule.name}, ${rule.group}`);
})();
