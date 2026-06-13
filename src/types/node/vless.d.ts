/**
 * Clash VLESS 代理节点配置
 */
interface VlessProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 vless */
  type: 'vless';

  /** 服务器地址/域名 */
  server: string;

  /** 端口号 */
  port: number;

  /** VLESS 用户 ID (UUID) */
  uuid: string;

  /** [可选] 是否启用 UDP 转发。默认为 false */
  udp?: boolean;

  /** [可选] XTLS 流量控制方式。例如：xtls-rprx-vision, xtls-rprx-direct 等 */
  flow?: 'xtls-rprx-vision' | 'xtls-rprx-direct' | string;

  /** [可选] VLESS 数据包编码方式 */
  'packet-encoding'?: 'none' | 'xudp';

  /** VLESS 节点的加密方式。VLESS 协议规范要求此字段为空字符串 "" */
  encryption: '';

  // --- TLS/Reality 配置 ---

  /** [可选] 是否启用 TLS 加密 */
  tls?: boolean;

  /** [可选] 服务器名称 (SNI)。在 tls: true 时推荐设置 */
  servername?: string;

  /** [可选] TLS 应用层协议协商 (ALPN) 列表 */
  alpn?: string[];

  /** [可选] TLS 指纹 (SHA256) */
  fingerprint?: string;

  /** [可选] 客户端 TLS 指纹，用于伪装客户端类型 (例如 'chrome', 'firefox') */
  'client-fingerprint'?: string;

  /** [可选] 是否跳过证书验证。在 tls: true 时有效 */
  'skip-cert-verify'?: boolean;

  /** [可选] Reality 配置选项，用于 Vless with Reality */
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
  network?: 'tcp' | 'ws' | 'h2' | 'quic' | 'grpc' | string;

  /** [可选] TCP 传输协议的配置选项 (network: tcp 时) */
  'tcp-opts'?: {
    // 例如：
    'header-type'?: 'none' | 'http';
    request?: { [key: string]: any };
    response?: { [key: string]: any };
    [key: string]: any;
  };

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
