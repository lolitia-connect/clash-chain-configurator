// 节点类型定义拆分至 types/node/ 目录下各协议文件
// 由 TypeScript 自动包含（tsconfig include: **/*.ts）

type ProxyNode = (
  | HttpProxyNode
  | Socks5ProxyNode
  | ShadowsocksProxyNode
  | ShadowsocksRProxyNode
  | SnellProxyNode
  | VmessProxyNode
  | VlessProxyNode
  | TrojanProxyNode
  | AnyTlsProxyNode
  | MieruProxyNode
  | SudokuProxyNode
  | HysteriaProxyNode
  | Hysteria2ProxyNode
  | TuicProxyNode
  | WireGuardProxyNode
  | SshProxyNode
) & {
  'dialer-proxy'?: string;
  [key: string]: string | undefined;
};

/**
 * 代理提供者 (Proxy Provider) 的健康检查配置
 */
interface HealthCheckConfig {
  /** 是否启用健康检查 */
  enable: boolean;
  /** 健康检查的目标 URL */
  url: string;
  /** 健康检查的间隔时间（秒） */
  interval: number;
  /** 健康检查的超时时间（毫秒） */
  timeout: number;
  /** 是否启用懒惰模式 (Lazy)，即只在需要时才进行检查 */
  lazy: boolean;
  /** 期望的 HTTP 状态码 */
  'expected-status'?: number;
}

/**
 * 代理提供者 (Proxy Provider) 对所有节点的覆盖配置
 */
interface ProxyOverrideConfig {
  /** [可选] 是否启用 TCP Fast Open (TFO) */
  tfo?: boolean;
  /** [可选] 是否启用 MPTCP (MultiPath TCP) */
  mptcp?: boolean;
  /** [可选] 是否启用 UDP 转发 */
  udp?: boolean;
  /** [可选] 是否启用 UDP over TCP */
  'udp-over-tcp'?: boolean;
  /** [可选] 下行带宽限制 */
  down?: string;
  /** [可选] 上行带宽限制 */
  up?: string;
  /** [可选] 是否跳过证书验证 */
  'skip-cert-verify'?: boolean;
  /** [可选] 用于拉取订阅/连接节点的拨号代理 */
  'dialer-proxy'?: string;
  /** [可选] 指定出站接口名称 */
  'interface-name'?: string;
  /** [可选] 指定路由标记 (routing mark) */
  'routing-mark'?: number;
  /** [可选] IP 版本偏好 */
  'ip-version'?: 'ipv4-prefer' | 'ipv6-prefer' | 'ipv4-only' | 'ipv6-only';
  /** [可选] 代理节点名称的附加前缀 */
  'additional-prefix'?: string;
  /** [可选] 代理节点名称的附加后缀 */
  'additional-suffix'?: string;
  /** [可选] 代理名称的重命名/替换规则 */
  'proxy-name'?: Array<{
    /** 匹配模式 (正则表达式) */
    pattern: string;
    /** 替换目标 */
    target: string;
  }>;
}

/**
 * 代理提供者 (Proxy Provider) 的配置项
 */
interface ProxyProvider {
  /** 代理提供者类型。通常为 http, file, inline */
  type: 'http' | 'file' | 'inline';
  /** 远程订阅 URL。如果 type 为 file 或 inline 则忽略 */
  url?: string;
  /** 本地文件路径，用于缓存或 file 类型的提供者 */
  path?: string;
  /** 自动更新订阅的间隔时间（秒） */
  interval: number;
  /** 用于下载订阅文件的代理，例如 DIRECT 或其他代理组/节点 */
  proxy?: 'DIRECT' | string;
  /** [可选] 订阅内容的最大大小限制（字节），0 表示无限制 */
  'size-limit'?: number;

  /** [可选] 下载订阅时使用的自定义 HTTP 头部 */
  header?: {
    'User-Agent'?: string[];
    Authorization?: string[];
    [key: string]: string[] | undefined;
  };

  /** [可选] 代理节点的健康检查配置 */
  'health-check'?: HealthCheckConfig;

  /** [可选] 覆盖提供者内所有节点的基础配置 */
  override?: ProxyOverrideConfig;

  /** [可选] 代理节点名称的包含过滤器 (正则表达式) */
  filter?: string;
  /** [可选] 代理节点名称的排除过滤器 (正则表达式) */
  'exclude-filter'?: string;
  /** [可选] 代理节点类型的排除过滤器 (正则表达式或竖线分隔的类型列表) */
  'exclude-type'?: string;

  /** [可选] 嵌入在配置中的代理节点定义，仅在特定场景下用于补充 */
  payload?: ProxyNode[];
}

interface RuleProvider {
  type: 'http' | 'file' | 'inline' | string;
  behavior?: string;
  format?: string;
  url?: string;
  interval?: number;
  path?: string;
  proxy?: string;
  header?: Record<string, string[] | undefined>;
  [key: string]: any;
}

type RuleSet = string;

interface RuleDefinition {
  name: string;
  description?: string;
  provider: RuleProvider;
  /** 所属代理组名称，如 '🍎 Apple' */
  group: string;
  /** 该规则的默认代理偏好：direct-first 或 outbound-first */
  proxyPreference?: 'direct-first' | 'outbound-first';
  /** 父代理组名称，设置后该组 proxies 列表的第一个选项将自动设为 parentGroup */
  parentGroup?: string;
  /** 依赖的代理组名称列表，设置后该规则及其子规则将排在所有引用这些组的规则之后 */
  after?: string[];
}

interface ProxyProviderExtend extends ProxyProvider {
  name: string;
  payloadContent?: string;
  /** 自定义节点名称前缀，生成时写入 override.additional-prefix */
  prefix?: string;
  /** 是否为落地节点 */
  landing?: boolean;
}

/**
 * 完整的 proxy-providers 配置结构
 */
interface ClashProxyProviders {
  /** 键名为提供者名称，值为对应的配置对象 */
  [providerName: string]: ProxyProvider;
}

/**
 * 代理组 (Proxy Group) 的基础配置
 */
interface ProxyGroup extends HealthCheckOptions {
  /** 代理组的名称 */
  name: string;
  /** 代理组的类型 */
  type: 'select' | 'url-test' | 'fallback' | 'load-balance' | 'relay' | string;

  /** [可选] 直接列出的代理节点或代理组的名称 */
  proxies?: string[];

  /** [可选] 引用的代理提供者名称列表 */
  use?: string[];

  /** [可选] 隐藏该代理组，使其不显示在管理界面 */
  hidden?: boolean;
  /** [可选] 用于管理界面显示的图标 URL 或 Base64 字符串 */
  icon?: string;

  /** [可选] 是否禁用该组内的所有 UDP 转发 */
  'disable-udp'?: boolean;
  /** [可选] 指定出站接口名称 */
  'interface-name'?: string;
  /** [可选] 指定路由标记 (routing mark) */
  'routing-mark'?: number;

  /** [可选] 代理节点名称的包含过滤器 (正则表达式) */
  filter?: string;
  /** [可选] 代理节点名称的排除过滤器 (正则表达式) */
  'exclude-filter'?: string;
  /** [可选] 代理节点类型的排除过滤器 (正则表达式或竖线分隔的类型列表) */
  'exclude-type'?: string;

  /** [可选] 自动包含所有在配置中定义的直接代理节点 */
  'include-all-proxies'?: boolean;
  /** [可选] 自动包含所有在配置中定义的代理提供者 */
  'include-all-providers'?: boolean;

  /** [可选] 链式代理 - 通过指定的代理组/节点出站 */
  'dialer-proxy'?: string;

  // 对于 Select/Fallback/URL-Test/Load-Balance 组的特殊过滤选项
  /** [可选] 是否包含所有直接代理节点和 provider 节点。注意与 include-all-proxies/providers 的区别 */
  'include-all'?: boolean;
}

/**
 * URL-Test、Fallback 或 Select 组的健康检查和测试配置
 */
interface HealthCheckOptions {
  /** [可选] 健康检查或 URL 测试的 URL */
  url?: string;
  /** [可选] 健康检查或 URL 测试的间隔时间（秒） */
  interval?: number;
  /** [可选] 检查超时时间（毫秒） */
  timeout?: number;
  /** [可选] 期望的 HTTP 状态码 */
  'expected-status'?: number;

  // 仅适用于 Fallback/URL-Test/Select 组
  /** [可选] 允许失败的最大次数，超过后节点将被禁用 */
  'max-failed-times'?: number;
  /** [可选] 是否启用懒惰模式 (Lazy)，即只在需要时才进行检查 */
  lazy?: boolean;
}

interface ClashConfig {
  'proxy-providers': ClashProxyProviders;
  'rule-providers': Record<string, RuleProvider>;
  'proxy-groups': ProxyGroup[];
  proxies: ProxyNode[];
  rules: RuleSet[];
  dns: { [key: string]: any };
  [key: string]: any;
}
