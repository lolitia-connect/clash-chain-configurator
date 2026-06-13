import { AIRule } from './ACL4SSR/AI';
import { BilibiliRule } from './ACL4SSR/Bilibili';
import { BilibiliHMTRule } from './ACL4SSR/BilibiliHMT';
import { ChinaOneKeyLoginRule } from './ACL4SSR/ChinaOneKeyLogin';
import { CryptoRule } from './ACL4SSR/Crypto';
import { EpicRule } from './ACL4SSR/Epic';
import { SteamRule } from './ACL4SSR/Steam';


export const ruleDefinitions: RuleDefinition[] = [
  AIRule,
  BilibiliRule,
  BilibiliHMTRule,
  ChinaOneKeyLoginRule,
  CryptoRule,
  EpicRule,
  SteamRule,
];