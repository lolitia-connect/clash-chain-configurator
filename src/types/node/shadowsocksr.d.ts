/**
 * Clash ShadowsocksR (SSR) 代理节点配置
 */
interface ShadowsocksRProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 ssr */
  type: 'ssr';

  /** 服务器地址/域名 */
  server: string;

  /** 端口号 */
  port: number;

  /** 加密方式 (Cipher)，例如 chacha20-ietf, aes-256-cfb 等 */
  cipher: string;

  /** 连接密码 */
  password: string;

  /** 混淆方式 (Obfuscation)，例如 plain, tls1.2_ticket_auth 等 */
  obfs: string;

  /** 协议 (Protocol)，例如 origin, auth_sha1_v4 等 */
  protocol: string;

  /** [可选] 混淆参数 (Obfuscation Parameter) */
  'obfs-param'?: string;

  /** [可选] 协议参数 (Protocol Parameter) */
  'protocol-param'?: string;

  /** [可选] 是否启用 UDP 转发。默认为 false */
  udp?: boolean;

  /** [可选] 允许其他未显式列出的配置字段 */
  [key: string]: any;
}
