/**
 * Clash Sudoku 代理节点配置
 */
interface SudokuProxyNode {
  /** 节点名称 */
  name: string;

  /** 代理类型，这里是 sudoku */
  type: 'sudoku';

  /** 服务器地址 */
  server: string;

  /** 端口号 */
  port: number;

  /** 客户端密钥 (Key) */
  key: string;

  /** [可选] AEAD 加密方法 */
  'aead-method'?: 'chacha20-poly1305' | 'aes-128-gcm' | 'aes-256-gcm' | string;

  /** [可选] 最小填充字节数 */
  'padding-min'?: number;

  /** [可选] 最大填充字节数 */
  'padding-max'?: number;

  /** [可选] 混淆表类型 */
  'table-type'?: 'prefer_ascii' | 'prefer_hex' | 'full' | string;

  /** [可选] 是否启用 HTTP 伪装 (HTTP Masking) */
  'http-mask'?: boolean;

  /** [可选] 允许其他未显式列出的配置字段 */
  [key: string]: any;
}
