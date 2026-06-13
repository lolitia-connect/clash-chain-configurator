import { AppleRule } from './rules/Apple';
import { GoogleRule } from './rules/Google';
import { MicrosoftRule } from './rules/Microsoft';
import { GithubRule } from './rules/Github';
import { HBORule } from './rules/HBO';
import { DisneyRule } from './rules/Disney';
import { TikTokRule } from './rules/TikTok';
import { NetflixRule } from './rules/Netflix';
import { GlobalMediaRule } from './rules/GlobalMedia';
import { TelegramRule } from './rules/Telegram';
import { OpenAIRule } from './rules/OpenAI';
import { GeminiRule } from './rules/Gemini';
import { CopilotRule } from './rules/Copilot';
import { ClaudeRule } from './rules/Claude';
import { CryptoRule } from './rules/Crypto';
import { CryptocurrencyRule } from './rules/Cryptocurrency';
import { GameRule } from './rules/Game';
import { GlobalRule } from './rules/Global';
import { ChinaMaxRule } from './rules/ChinaMax';
import { LanRule } from './rules/Lan';

export const defaultRuleDefinitions: RuleDefinition[] = [
  AppleRule,
  GoogleRule,
  MicrosoftRule,
  GithubRule,
  HBORule,
  DisneyRule,
  TikTokRule,
  NetflixRule,
  GlobalMediaRule,
  TelegramRule,
  OpenAIRule,
  GeminiRule,
  CopilotRule,
  ClaudeRule,
  CryptoRule,
  CryptocurrencyRule,
  GameRule,
  GlobalRule,
  ChinaMaxRule,
  LanRule,
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
