/**
 * Clash Hysteria 2 代理节点配置
 */
interface Hysteria2ProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 hysteria2 */
  type: 'hysteria2';

  /** 服务器地址/域名 */
  server: string;

  /** 主端口号 */
  port: number;

  /** [可选] 端口号或范围。例如 "443-8443" */
  ports?: string;

  /** 认证密码 */
  password: string;

  /** [可选] 上行带宽限制 (Upload Bandwidth)。若不写单位,默认为 Mbps */
  up?: string;

  /** [可选] 下行带宽限制 (Download Bandwidth)。若不写单位,默认为 Mbps */
  down?: string;

  /** [可选] 混淆类型。目前仅支持 salamander */
  obfs?: 'salamander' | string;

  /** [可选] 混淆密码。仅在 obfs 启用时使用 */
  'obfs-password'?: string;

  // --- TLS 配置 ---

  /** [可选] 服务器名称指示 (SNI)。用于 TLS 握手 */
  sni?: string;

  /** [可选] 是否跳过证书验证。默认为 false */
  'skip-cert-verify'?: boolean;

  /** [可选] TLS 指纹 (SHA256)。实现 SSL Pining */
  fingerprint?: string;

  /** [可选] 应用层协议协商 (ALPN) 列表 */
  alpn?: string[];

  /** [可选] 允许其他未显式列出的配置字段 */
  [key: string]: any;
}
