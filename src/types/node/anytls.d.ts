/**
 * Clash AnyTLS 代理节点配置
 */
interface AnyTlsProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 anytls */
  type: 'anytls';

  /** 服务器地址/域名 */
  server: string;

  /** 端口号 */
  port: number;

  /** 认证密码 */
  password: string;

  /** [可选] 客户端 TLS 指纹，用于伪装客户端类型 (例如 'chrome', 'firefox', 'random') */
  'client-fingerprint'?: string;

  /** [可选] 是否启用 UDP 转发。默认为 false */
  udp?: boolean;

  // --- 会话管理配置 ---

  /** [可选] 检查空闲会话的间隔时间 (秒) */
  'idle-session-check-interval'?: number;

  /** [可选] 空闲会话的超时时间 (秒)，超过此时间会话将被关闭 */
  'idle-session-timeout'?: number;

  /** [可选] 最小保持空闲的会话数量 */
  'min-idle-session'?: number;

  // --- TLS 配置 ---

  /** [可选] 服务器名称指示 (SNI) */
  sni?: string;

  /** [可选] TLS 应用层协议协商 (ALPN) 列表 */
  alpn?: string[];

  /** [可选] 是否跳过证书验证。默认为 false */
  'skip-cert-verify'?: boolean;

  /** [可选] 允许其他未显式列出的配置字段 */
  [key: string]: any;
}
