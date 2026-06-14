import { AIRule } from './ACL4SSR/AI';
import { BilibiliRule } from './ACL4SSR/Bilibili';
import { BilibiliHMTRule } from './ACL4SSR/BilibiliHMT';
import { ChinaOneKeyLoginRule } from './ACL4SSR/ChinaOneKeyLogin';
import { CryptoRule } from './ACL4SSR/Crypto';
import { EpicRule } from './ACL4SSR/Epic';
import { GeminiRule } from './ACL4SSR/Gemini';
import { GoogleRule } from './ACL4SSR/Google';
import { GoogleCNRule } from './ACL4SSR/GoogleCN';
import { GoogleEarthRule } from './ACL4SSR/GoogleEarth';
import { GoogleFCMRule } from './ACL4SSR/GoogleFCM';
import { SteamRule } from './ACL4SSR/Steam';


export const ruleDefinitions: RuleDefinition[] = [
  AIRule,
  BilibiliRule,
  BilibiliHMTRule,
  CryptoRule,
  EpicRule,
  SteamRule,
  GeminiRule,
  GoogleRule,
  GoogleCNRule,
  GoogleEarthRule,
  GoogleFCMRule,
  
  ChinaOneKeyLoginRule,
];