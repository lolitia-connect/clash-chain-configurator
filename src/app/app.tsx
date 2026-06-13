import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ConfigConfigurator from './clash/configurator';
import ProviderList from '@/components/ProviderList';
import ProviderDialog from '@/components/ProviderDialog';
import FinalProxyNodeList from '@/components/FinalProxyNodeList';
import FinalProxyNodeDialog from '@/components/FinalProxyNodeDialog';
import ImportProxyNodesDialog from '@/components/ImportProxyNodesDialog';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { Plus, Import, Copy, Download, Github, Sun, Moon, Monitor } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useTheme } from 'next-themes';

const configurator = new ConfigConfigurator();

const STORAGE_KEYS = {
  PROVIDERS: 'clash-chain-providers',
  LANDING_PROVIDERS: 'clash-chain-landing-providers',
  ENTRY_PROXY_NODES: 'clash-chain-entry-proxy-nodes',
  LANDING_PROXY_NODES: 'clash-chain-landing-proxy-nodes',
};

export default function App() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [content, setContent] = useState(configurator.content);
  const [dataLoaded, setDataLoaded] = useState(false);

  // ── 入口节点：订阅 ──
  const [providers, setProviders] = useState<ProxyProviderExtend[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // ── 落地节点：订阅 ──
  const [landingProviders, setLandingProviders] = useState<ProxyProviderExtend[]>([]);
  const [landingDialogOpen, setLandingDialogOpen] = useState(false);
  const [editingLandingIndex, setEditingLandingIndex] = useState<number | null>(null);

  // ── 入口节点：手动添加 ──
  const [entryProxyNodes, setEntryProxyNodes] = useState<ProxyNode[]>([]);
  const [entryNodeDialogOpen, setEntryNodeDialogOpen] = useState(false);
  const [editingEntryNodeIndex, setEditingEntryNodeIndex] = useState<number | null>(null);
  const [entryImportDialogOpen, setEntryImportDialogOpen] = useState(false);

  // ── 落地节点：手动添加 ──
  const [landingProxyNodes, setLandingProxyNodes] = useState<ProxyNode[]>([]);
  const [landingNodeDialogOpen, setLandingNodeDialogOpen] = useState(false);
  const [editingLandingNodeIndex, setEditingLandingNodeIndex] = useState<number | null>(null);
  const [landingImportDialogOpen, setLandingImportDialogOpen] = useState(false);

  // ── 加载 ──
  useEffect(() => {
    try {
      const savedProviders = localStorage.getItem(STORAGE_KEYS.PROVIDERS);
      const savedLandingProviders = localStorage.getItem(STORAGE_KEYS.LANDING_PROVIDERS);
      const savedEntryNodes = localStorage.getItem(STORAGE_KEYS.ENTRY_PROXY_NODES);
      const savedLandingNodes = localStorage.getItem(STORAGE_KEYS.LANDING_PROXY_NODES);
      // 兼容旧数据：旧的 PROXY_NODES 全部作为落地节点
      const legacyNodes = localStorage.getItem('clash-chain-proxy-nodes');
      if (savedProviders) setProviders(JSON.parse(savedProviders));
      if (savedLandingProviders) setLandingProviders(JSON.parse(savedLandingProviders));
      if (savedEntryNodes) setEntryProxyNodes(JSON.parse(savedEntryNodes));
      if (savedLandingNodes) {
        setLandingProxyNodes(JSON.parse(savedLandingNodes));
      } else if (legacyNodes) {
        setLandingProxyNodes(JSON.parse(legacyNodes));
      }
    } catch (e) {
      console.error('Failed to load from localStorage:', e);
    } finally {
      setDataLoaded(true);
    }
  }, []);

  // ── 订阅变更 → 更新配置 ──
  useEffect(() => {
    const allProviders = [
      ...providers.map((p) => ({ ...p, landing: false })),
      ...landingProviders.map((p) => ({ ...p, landing: true })),
    ];
    configurator.setProviders(allProviders);
    configurator.setFinalProxyNodes(entryProxyNodes, landingProxyNodes);
    setContent(configurator.content);
    try {
      localStorage.setItem(STORAGE_KEYS.PROVIDERS, JSON.stringify(providers));
    } catch (e) {
      console.error('Failed to save providers:', e);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.LANDING_PROVIDERS, JSON.stringify(landingProviders));
    } catch (e) {
      console.error('Failed to save landing providers:', e);
    }
  }, [providers, landingProviders]);

  // ── 手动节点变更 → 更新配置 ──
  useEffect(() => {
    configurator.setFinalProxyNodes(entryProxyNodes, landingProxyNodes);
    setContent(configurator.content);
    try {
      localStorage.setItem(STORAGE_KEYS.ENTRY_PROXY_NODES, JSON.stringify(entryProxyNodes));
    } catch (e) {
      console.error('Failed to save entry proxy nodes:', e);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.LANDING_PROXY_NODES, JSON.stringify(landingProxyNodes));
    } catch (e) {
      console.error('Failed to save landing proxy nodes:', e);
    }
  }, [entryProxyNodes, landingProxyNodes]);

  // ── 入口订阅 ──
  const handleRemoveProvider = (index: number) => {
    setProviders(providers.filter((_, i) => i !== index));
  };
  const handleEditProvider = (index: number) => {
    setEditingIndex(index);
    setDialogOpen(true);
  };
  const handleAddProvider = () => {
    setEditingIndex(null);
    setDialogOpen(true);
  };
  const handleSaveProvider = (provider: ProxyProviderExtend) => {
    if (editingIndex !== null) {
      const newProviders = [...providers];
      newProviders[editingIndex] = provider;
      setProviders(newProviders);
    } else {
      setProviders([...providers, provider]);
    }
  };

  // ── 落地订阅 ──
  const handleRemoveLandingProvider = (index: number) => {
    setLandingProviders(landingProviders.filter((_, i) => i !== index));
  };
  const handleEditLandingProvider = (index: number) => {
    setEditingLandingIndex(index);
    setLandingDialogOpen(true);
  };
  const handleAddLandingProvider = () => {
    setEditingLandingIndex(null);
    setLandingDialogOpen(true);
  };
  const handleSaveLandingProvider = (provider: ProxyProviderExtend) => {
    if (editingLandingIndex !== null) {
      const newProviders = [...landingProviders];
      newProviders[editingLandingIndex] = provider;
      setLandingProviders(newProviders);
    } else {
      setLandingProviders([...landingProviders, provider]);
    }
  };

  // ── 入口手动节点 ──
  const handleRemoveEntryNode = (index: number) => {
    setEntryProxyNodes(entryProxyNodes.filter((_, i) => i !== index));
  };
  const handleEditEntryNode = (index: number) => {
    setEditingEntryNodeIndex(index);
    setEntryNodeDialogOpen(true);
  };
  const handleAddEntryNode = () => {
    setEditingEntryNodeIndex(null);
    setEntryNodeDialogOpen(true);
  };
  const handleSaveEntryNode = (node: ProxyNode) => {
    if (editingEntryNodeIndex !== null) {
      const newNodes = [...entryProxyNodes];
      newNodes[editingEntryNodeIndex] = node;
      setEntryProxyNodes(newNodes);
    } else {
      setEntryProxyNodes([...entryProxyNodes, node]);
    }
  };
  const handleImportEntryNodes = (nodes: ProxyNode[]) => {
    setEntryProxyNodes([...entryProxyNodes, ...nodes]);
  };

  // ── 落地手动节点 ──
  const handleRemoveLandingNode = (index: number) => {
    setLandingProxyNodes(landingProxyNodes.filter((_, i) => i !== index));
  };
  const handleEditLandingNode = (index: number) => {
    setEditingLandingNodeIndex(index);
    setLandingNodeDialogOpen(true);
  };
  const handleAddLandingNode = () => {
    setEditingLandingNodeIndex(null);
    setLandingNodeDialogOpen(true);
  };
  const handleSaveLandingNode = (node: ProxyNode) => {
    if (editingLandingNodeIndex !== null) {
      const newNodes = [...landingProxyNodes];
      newNodes[editingLandingNodeIndex] = node;
      setLandingProxyNodes(newNodes);
    } else {
      setLandingProxyNodes([...landingProxyNodes, node]);
    }
  };
  const handleImportLandingNodes = (nodes: ProxyNode[]) => {
    setLandingProxyNodes([...landingProxyNodes, ...nodes]);
  };

  // ── 复制 / 下载 ──
  const handleCopyConfig = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('已复制到剪贴板');
    } catch {
      toast.error('复制失败');
    }
  };
  const handleDownloadConfig = () => {
    const blob = new Blob([content], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clash-config.yaml';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('配置已下载');
  };

  const allProviderNames = [...providers, ...landingProviders].map((p) => p.name);
  const allNodeNames = [...entryProxyNodes, ...landingProxyNodes].map((p) => p.name);
  const hasEntry = providers.length > 0 || entryProxyNodes.length > 0;
  const hasLanding = landingProviders.length > 0 || landingProxyNodes.length > 0;
  const canGenerate = hasEntry && hasLanding;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <h1 className="text-lg sm:text-2xl font-bold">Clash 链式配置生成器</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system')}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="切换主题"
            >
              {mounted && theme === 'system' && <Monitor className="h-5 w-5" />}
              {mounted && theme === 'light' && <Sun className="h-5 w-5" />}
              {mounted && theme === 'dark' && <Moon className="h-5 w-5" />}
              {!mounted && <Monitor className="h-5 w-5" />}
            </button>
            <a
            href="https://github.com/lolitia-connect/clash-chain-configurator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="hidden sm:inline">源代码</span>
          </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 pt-16 sm:pt-20 pb-4 space-y-4 sm:space-y-8">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 sm:p-4 text-xs sm:text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200">
          <p>
            🔒
            本应用是开源的纯客户端应用，不会向任何服务器传输您的数据，所有数据均存储在浏览器本地，请放心使用。使用说明请见
            <a
              className="underline"
              href="https://github.com/lolitia-connect/clash-chain-configurator?tab=readme-ov-file#%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E"
              target="noopener noreferrer"
            >
              代码仓库
            </a>
            。
          </p>
        </div>

        {/* ═══════════════ 入口节点 ═══════════════ */}
        <div className="relative rounded-lg border p-4 sm:p-6 space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold">入口节点</h2>
          {!dataLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/60 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                加载中...
              </div>
            </div>
          )}

          {/* ── 订阅 ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-medium text-muted-foreground">订阅</h3>
              <Button onClick={handleAddProvider} size="sm" className="sm:size-default">
                <Plus className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">添加</span>
              </Button>
            </div>
            <ProviderList
              providers={providers}
              onRemove={handleRemoveProvider}
              onEdit={handleEditProvider}
              emptyText="暂无入口节点订阅"
            />
          </div>

          <ProviderDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            provider={editingIndex !== null ? providers[editingIndex] : null}
            onSave={handleSaveProvider}
            existingNames={allProviderNames}
            title="入口节点订阅"
          />

          {/* ── 手动添加 ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-medium text-muted-foreground">手动添加</h3>
              <div className="flex gap-1 sm:gap-2">
                <Button
                  onClick={() => setEntryImportDialogOpen(true)}
                  variant="outline"
                  size="sm"
                  className="sm:size-default"
                >
                  <Import className="h-4 w-4 sm:mr-2" />{' '}
                  <span className="hidden sm:inline">导入</span>
                </Button>
                <Button onClick={handleAddEntryNode} size="sm" className="sm:size-default">
                  <Plus className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">添加</span>
                </Button>
              </div>
            </div>
            <FinalProxyNodeList
              proxyNodes={entryProxyNodes}
              onRemove={handleRemoveEntryNode}
              onEdit={handleEditEntryNode}
            />
          </div>

          <FinalProxyNodeDialog
            open={entryNodeDialogOpen}
            onOpenChange={setEntryNodeDialogOpen}
            proxyNode={editingEntryNodeIndex !== null ? entryProxyNodes[editingEntryNodeIndex] : null}
            onSave={handleSaveEntryNode}
            existingNames={allNodeNames}
          />

          <ImportProxyNodesDialog
            open={entryImportDialogOpen}
            onOpenChange={setEntryImportDialogOpen}
            onImport={handleImportEntryNodes}
            existingNames={allNodeNames}
          />
        </div>

        {/* ═══════════════ 落地节点 ═══════════════ */}
        <div className="relative rounded-lg border p-4 sm:p-6 space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-semibold">落地节点</h2>
          {!dataLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/60 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                加载中...
              </div>
            </div>
          )}

          {/* ── 订阅 ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-medium text-muted-foreground">订阅</h3>
              <Button onClick={handleAddLandingProvider} size="sm" className="sm:size-default">
                <Plus className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">添加</span>
              </Button>
            </div>
            <ProviderList
              providers={landingProviders}
              onRemove={handleRemoveLandingProvider}
              onEdit={handleEditLandingProvider}
              emptyText="暂无落地节点订阅"
            />
          </div>

          <ProviderDialog
            open={landingDialogOpen}
            onOpenChange={setLandingDialogOpen}
            provider={editingLandingIndex !== null ? landingProviders[editingLandingIndex] : null}
            onSave={handleSaveLandingProvider}
            existingNames={allProviderNames}
            title="落地节点订阅"
          />

          {/* ── 手动添加 ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-medium text-muted-foreground">手动添加</h3>
              <div className="flex gap-1 sm:gap-2">
                <Button
                  onClick={() => setLandingImportDialogOpen(true)}
                  variant="outline"
                  size="sm"
                  className="sm:size-default"
                >
                  <Import className="h-4 w-4 sm:mr-2" />{' '}
                  <span className="hidden sm:inline">导入</span>
                </Button>
                <Button onClick={handleAddLandingNode} size="sm" className="sm:size-default">
                  <Plus className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">添加</span>
                </Button>
              </div>
            </div>
            <FinalProxyNodeList
              proxyNodes={landingProxyNodes}
              onRemove={handleRemoveLandingNode}
              onEdit={handleEditLandingNode}
            />
          </div>

          <FinalProxyNodeDialog
            open={landingNodeDialogOpen}
            onOpenChange={setLandingNodeDialogOpen}
            proxyNode={editingLandingNodeIndex !== null ? landingProxyNodes[editingLandingNodeIndex] : null}
            onSave={handleSaveLandingNode}
            existingNames={allNodeNames}
          />

          <ImportProxyNodesDialog
            open={landingImportDialogOpen}
            onOpenChange={setLandingImportDialogOpen}
            onImport={handleImportLandingNodes}
            existingNames={allNodeNames}
          />
        </div>

        <Toaster />

        {/* ═══════════════ 生成的配置 ═══════════════ */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold">生成的配置</h2>
            <div className="flex gap-1 sm:gap-2">
              {canGenerate && (
                <>
                  <Button variant="outline" size="sm" onClick={handleCopyConfig}>
                    <Copy className="h-4 w-4 sm:mr-2" /> <span className="hidden sm:inline">复制</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownloadConfig}>
                    <Download className="h-4 w-4 sm:mr-2" />{' '}
                    <span className="hidden sm:inline">下载</span>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg">
            <SyntaxHighlighter
              language="yaml"
              style={oneDark}
              showLineNumbers
              customStyle={{ borderRadius: '0.5rem', fontSize: '0.75rem', margin: 0 }}
              className="!h-[400px] sm:!h-[600px] md:!h-[800px] text-xs sm:text-sm overflow-auto"
            >
              {canGenerate ? content : '请添加入口和落地订阅或手动节点以生成配置。'}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </>
  );
}
