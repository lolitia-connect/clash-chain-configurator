/**
 * Clash Trojan 代理节点配置
 */
interface TrojanProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 trojan */
  type: 'trojan';

  /** 服务器地址/域名 */
  server: string;

  /** 端口号 */
  port: number;

  /** Trojan 密码 (Password) */
  password: string;

  /** [可选] 是否启用 UDP 转发。默认为 false */
  udp?: boolean;

  // --- TLS/Reality 配置 ---

  /** [可选] 服务器名称指示 (SNI) */
  sni?: string;

  /** [可选] TLS 应用层协议协商 (ALPN) 列表 */
  alpn?: string[];

  /** [可选] 客户端 TLS 指纹，用于伪装客户端类型 (例如 'chrome', 'random') */
  'client-fingerprint'?: string;

  /** [可选] TLS 指纹 (SHA256) */
  fingerprint?: string;

  /** [可选] 是否跳过证书验证。默认为 false */
  'skip-cert-verify'?: boolean;

  /** [可选] ShadowSocks over Trojan 配置选项 */
  'ss-opts'?: {
    /** 是否启用 SS 封装。默认为 false */
    enabled?: boolean;
    /** SS 加密方法 */
    method?: string;
    /** SS 密码 */
    password?: string;
    [key: string]: any;
  };

  /** [可选] Reality 配置选项，用于 Trojan with Reality */
  'reality-opts'?: {
    /** 服务器公钥 */
    'public-key': string;
    /** 短 ID */
    'short-id': string;
    /** [允许其他自定义 Reality 选项] */
    [key: string]: any;
  };

  // --- 网络配置 ---

  /** [可选] 传输协议类型 */
  network?: 'tcp' | 'ws' | 'h2' | 'grpc' | string;

  /** [可选] WebSocket 传输协议的配置选项 (network: ws 时) */
  'ws-opts'?: {
    path?: string;
    headers?: {
      Host?: string;
      [key: string]: string | undefined;
    };
    [key: string]: any;
  };

  // --- SMUX (Stream Multiplexing) 配置 ---

  /** [可选] SMUX (Stream Multiplexing) 流多路复用配置 */
  smux?: {
    /** 是否启用 SMUX。默认为 false */
    enabled?: boolean;
    /** [允许其他自定义 SMUX 选项] */
    [key: string]: any;
  };

  /** [可选] 允许其他未显式列出的配置字段 */
  [key: string]: any;
}
