interface HttpProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 http */
  type: 'http';

  /** 服务器地址/域名 */
  server: string;

  /** 端口号 */
  port: number;

  /** [可选] 用户名 (用于需要认证的代理) */
  username?: string;

  /** [可选] 密码 (用于需要认证的代理) */
  password?: string;

  /** [可选] 是否启用 TLS，即使用 HTTPS 代理。默认为 false (HTTP) */
  tls?: boolean;

  /** [可选] 是否跳过证书验证。只在 tls: true 时有效 */
  'skip-cert-verify'?: boolean;

  /** [可选] SNI (Server Name Indication) 设置。只在 tls: true 时有效 */
  sni?: string;

  /** * [可选] TLS 指纹 (SHA256)。只在 tls: true 时有效。
   * 配置协议独立的指纹，将忽略 experimental.fingerprints。
   */
  fingerprint?: string;

  /** [可选] IP 版本，如 'dual' */
  'ip-version'?: 'dual' | 'ipv4' | 'ipv6';

  /** [可选] 自定义 HTTP 头部。例如 User-Agent 或 Authorization */
  headers?: {
    [key: string]: string;
  };
}
