/**
 * Clash Mieru 代理节点配置
 */
interface MieruProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 mieru */
  type: 'mieru';

  /** 服务器地址/域名 */
  server: string;

  /** 主端口号 */
  port: number;

  /** [可选] 额外的端口范围，例如 "2090-2099" */
  'port-range'?: string;

  /** [可选] 传输协议类型 */
  transport?: 'TCP' | 'UDP' | 'KCP' | string;

  /** [可选] 用户名 */
  username?: string;

  /** [可选] 密码 */
  password?: string;

  /** [可选] 多路复用模式 */
  multiplexing?: 'MULTIPLEXING_LOW' | 'MULTIPLEXING_HIGH' | string;

  /** [可选] 允许其他未显式列出的配置字段 */
  [key: string]: any;
}
