/**
 * Clash Snell 代理节点配置
 */
interface SnellProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 snell */
  type: 'snell';

  /** 服务器地址/域名 */
  server: string;

  /** 端口号 */
  port: number;

  /** 预共享密钥 (Pre-Shared Key) */
  psk: string;

  /** [可选] Snell 协议版本。默认为 1 */
  version?: 1 | 2 | 3 | number;

  /** [可选] 混淆配置选项 */
  'obfs-opts'?: {
    /** 混淆模式 (mode)，例如 tls, http */
    mode?: 'tls' | 'http' | string;

    /** 混淆目标主机名 */
    host?: string;

    /** [允许其他自定义混淆选项] */
    [key: string]: any;
  };

  /** [可选] 允许其他未显式列出的配置字段 */
  [key: string]: any;
}
