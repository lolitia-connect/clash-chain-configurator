/**
 * Clash Hysteria 代理节点配置
 */
interface HysteriaProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 hysteria */
  type: 'hysteria';

  /** 服务器地址/域名 */
  server: string;

  /** 端口号 */
  port: number;

  /** [可选] 端口号列表或范围。例如 "1000,2000-3000,4000" */
  ports?: string;

  /** 认证字符串/密码 */
  'auth-str': string;

  /** [可选] 混淆字符串 (Obfuscation String) */
  obfs?: string;

  /** [可选] 应用层协议协商 (ALPN) 列表 */
  alpn?: string[];

  /** [可选] 传输协议。支持 udp/wechat-video/faketcp */
  protocol?: 'udp' | 'wechat-video' | 'faketcp' | string;

  /** [可选] 上行带宽限制 (Upload Bandwidth) */
  up?: string;

  /** [可选] 下行带宽限制 (Download Bandwidth) */
  down?: string;

  /** [可选] 服务器名称指示 (SNI)。用于 TLS 握手 */
  sni?: string;

  /** [可选] 是否跳过证书验证。默认为 false */
  'skip-cert-verify'?: boolean;

  /** [可选] 接收窗口大小 (连接级别，字节)。默认值较大 */
  'recv-window-conn'?: number;

  /** [可选] 接收窗口大小 (字节)。默认值较大 */
  'recv-window'?: number;

  /** [可选] 是否禁用 MTU 发现 */
  disable_mtu_discovery?: boolean;

  /** [可选] TLS 指纹 (SHA256)。实现 SSL Pining */
  fingerprint?: string;

  /** [可选] 是否启用 Fast Open。默认为 false */
  'fast-open'?: boolean;

  /** [可选] 允许其他未显式列出的配置字段 */
  [key: string]: any;
}
