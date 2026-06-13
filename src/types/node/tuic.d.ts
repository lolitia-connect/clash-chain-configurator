/**
 * Clash TUIC 代理节点配置
 */
interface TuicProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 tuic */
  type: 'tuic';

  /** 服务器地址/域名 */
  server: string;

  /** 端口号 */
  port: number;

  /** 认证 Token (Clash 使用) */
  token: string;

  /** 用户 ID (UUID) */
  uuid: string;

  /** 密码。请注意，Clash 核心通常只使用 uuid/token 或 password/token 中的一个进行认证 */
  password?: string;

  /** [可选] 直接连接的 IP 地址，跳过 DNS 解析 */
  ip?: string;

  /** [可选] 心跳间隔时间 (毫秒) */
  'heartbeat-interval'?: number;

  /** [可选] 应用层协议协商 (ALPN) 列表，例如 [h3] */
  alpn?: string[];

  /** [可选] 是否禁用 SNI (Server Name Indication) */
  'disable-sni'?: boolean;

  /** [可选] 是否启用 Reduce RTT (减少往返时间) 优化 */
  'reduce-rtt'?: boolean;

  /** [可选] 请求超时时间 (毫秒) */
  'request-timeout'?: number;

  /** [可选] UDP 转发模式 */
  'udp-relay-mode'?: 'native' | 'quic';

  /** [可选] 拥塞控制算法 */
  'congestion-controller'?: 'bbr' | 'cubic' | 'newreno' | string;

  /** [可选] UDP 转发最大包大小 */
  'max-udp-relay-packet-size'?: number;

  /** [可选] 是否启用 Fast Open */
  'fast-open'?: boolean;

  /** [可选] 是否跳过证书验证 */
  'skip-cert-verify'?: boolean;

  /** [可选] 最大并发流数 */
  'max-open-streams'?: number;

  /** [可选] 强制指定的 SNI，如果 'disable-sni' 为 false */
  sni?: string;

  /** [可选] 允许其他未显式列出的配置字段 */
  [key: string]: any;
}
