interface Socks5ProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 socks5 */
  type: 'socks5';

  /** 服务器地址/域名 */
  server: string;

  /** 端口号 */
  port: number;

  /** [可选] 用户名 (用于需要认证的代理) */
  username?: string;

  /** [可选] 密码 (用于需要认证的代理) */
  password?: string;

  /** [可选] 是否启用 TLS，即使用 SOCKS5 over TLS。默认为 false */
  tls?: boolean;

  /** [可选] 是否支持 UDP 转发。默认为 false */
  udp?: boolean;

  /** [可选] 是否跳过证书验证。只在 tls: true 时有效 */
  'skip-cert-verify'?: boolean;

  /** [可选] TLS 指纹 (SHA256)。只在 tls: true 时有效。 */
  fingerprint?: string;

  /** [可选] IP 版本，如 'ipv6' */
  'ip-version'?: 'dual' | 'ipv4' | 'ipv6';
}
