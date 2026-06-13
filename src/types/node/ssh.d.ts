/**
 * Clash SSH 代理节点配置
 */
interface SshProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 ssh */
  type: 'ssh';

  /** 服务器地址/域名 */
  server: string;

  /** 端口号，默认为 22 */
  port: number;

  /** 用户名 */
  username: string;

  /** [可选] 密码认证。与 private-key 互斥 */
  password?: string;

  /** [可选] 私钥文件的路径或内容。与 password 互斥 */
  'private-key'?: string;

  /** [可选] 私钥的密码 (Passphrase) */
  'private-key-passphrase'?: string;

  /** [可选] 服务器主机公钥列表，用于验证服务器身份 (Host Key Pinning) */
  'host-key'?: string[];

  /** [可选] 允许的服务器主机密钥算法 */
  'host-key-algorithms'?: string[];

  /** [可选] 允许其他未显式列出的配置字段 */
  [key: string]: any;
}
