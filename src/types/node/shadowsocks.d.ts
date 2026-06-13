/**
 * Clash Shadowsocks (SS) 代理节点配置
 */
interface ShadowsocksProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 ss */
  type: 'ss';

  /** 服务器地址/域名 */
  server: string;

  /** 端口号 */
  port: number;

  /** 加密方式 (Cipher)，例如 aes-128-gcm, chacha20-poly1305 等 */
  cipher: string;

  /** 连接密码 */
  password: string;

  /** [可选] 是否启用 UDP 转发。默认为 false */
  udp?: boolean;

  /** [可选] 是否将 UDP 流量封装在 TCP 中 (UDP over TCP)。默认为 false */
  'udp-over-tcp'?: boolean;

  /** [可选] UDP over TCP 的版本。默认为 2 */
  'udp-over-tcp-version'?: number;

  /** [可选] IP 版本，如 'ipv4' */
  'ip-version'?: 'dual' | 'ipv4' | 'ipv6';

  /** [可选] 混淆插件类型 (Plugin Type)，如 obfs, v2ray-plugin 等 */
  plugin?: string;

  /** [可选] 混淆插件的配置选项 */
  'plugin-opts'?: {
    /** 混淆模式 (mode)，例如 tls, http */
    mode?: string;
    /** [允许其他自定义插件选项] */
    [key: string]: any;
  };

  /** [可选] SMUX (Stream Multiplexing) 流多路复用配置 */
  smux?: {
    /** 是否启用 SMUX。默认为 false */
    enabled?: boolean;
    /** [允许其他自定义 SMUX 选项] */
    [key: string]: any;
  };

  /** [可选] 允许其他未显式列出的配置字段 */
  [key: string]: any;
}
