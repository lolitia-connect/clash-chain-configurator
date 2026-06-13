/**
 * Clash WireGuard (wg) 代理节点配置
 */
interface WireGuardProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 wireguard */
  type: 'wireguard';

  /** 客户端私钥 (Private Key) */
  'private-key': string;

  /** 服务器地址/域名 */
  server: string;

  /** 端口号 */
  port: number;

  /** 客户端在 WireGuard 虚拟网络中的 IPv4 地址 */
  ip: string;

  /** [可选] 客户端在 WireGuard 虚拟网络中的 IPv6 地址 */
  ipv6?: string;

  /** 对端/服务器公钥 (Public Key) */
  'public-key': string;

  /** 允许通过此连接发送流量的目标 IP 范围 (路由规则) */
  'allowed-ips': string[];

  /** [可选] 预共享密钥 (Pre-Shared Key)，用于额外的密钥层 */
  'pre-shared-key'?: string;

  /** [可选] 保留字段，一个包含 3 个字节的数组或 Base64 字符串 */
  reserved?: number[] | string;

  /** [可选] 是否启用 UDP 转发。默认为 false */
  udp?: boolean;

  /** [可选] 最大传输单元 (MTU) */
  mtu?: number;

  /** [可选] 一个出站代理的标识。当值不为空时，将使用指定的 proxy/proxy-group 发出连接 */
  'dialer-proxy'?: string;

  /** [可选] 强制 DNS 远程解析，默认值为 false */
  'remote-dns-resolve'?: boolean;

  /** [可选] DNS 服务器列表。仅在 remote-dns-resolve 为 true 时生效 */
  dns?: string[];

  /** [可选] AmneziaWG 配置选项，用于增强型 WireGuard 功能 */
  'amnezia-wg-option'?: {
    /** 握手重传计数器阈值 */
    jc?: number;
    /** 最小握手间隔 (毫秒) */
    jmin?: number;
    /** 最大握手间隔 (毫秒) */
    jmax?: number;
    /** S1 参数 */
    s1?: number;
    /** S2 参数 */
    s2?: number;
    /** H1 参数 */
    h1?: number;
    /** H2 参数 */
    h2?: number;
    /** H4 参数 */
    h4?: number;
    /** H3 参数 */
    h3?: number;

    // AmneziaWG v1.5 特有字段，使用特定格式的字符串
    i1?: string;
    i2?: string;
    i3?: string;
    i4?: string;
    i5?: string;
    j1?: string;
    j2?: string;
    j3?: string;
    /** I/J time 参数 (秒) */
    itime?: number;

    /** [允许其他自定义 AmneziaWG 选项] */
    [key: string]: any;
  };

  /** [可选] 允许其他未显式列出的配置字段 */
  [key: string]: any;
}
