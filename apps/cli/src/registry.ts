import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const _dir         = dirname(fileURLToPath(import.meta.url));
const registryRoot = join(_dir, '..', 'registry');

export interface RegistryEntry {
  /** Short description shown in `inkui list` */
  description: string;
  /** Source file names inside packages/<name>/src/ */
  files: string[];
}

export const REGISTRY: Record<string, RegistryEntry> = {
  spinner: {
    description: 'Animated spinner — dots, line, arc, bounce styles',
    files: ['Spinner.tsx', 'index.ts'],
  },
  badge: {
    description: 'Status badge — default / success / warning / error / info',
    files: ['Badge.tsx', 'index.ts'],
  },
  'progress-bar': {
    description: 'Progress bar with fill chars, percent display, auto terminal width',
    files: ['ProgressBar.tsx', 'index.ts'],
  },
  'text-input': {
    description: 'Text input — cursor, backspace, arrow keys, placeholder, password',
    files: ['TextInput.tsx', 'index.ts'],
  },
  select: {
    description: 'Single-select menu with arrow navigation and disabled items',
    files: ['Select.tsx', 'index.ts'],
  },
  'multi-select': {
    description: 'Multi-select with space-toggle, set state, disabled items',
    files: ['MultiSelect.tsx', 'index.ts'],
  },
  table: {
    description: 'Data table — auto widths, overflow truncation, 5 border styles',
    files: ['Table.tsx', 'index.ts'],
  },
  dialog: {
    description: 'Modal dialog — title, message, action buttons, Escape to dismiss',
    files: ['Dialog.tsx', 'index.ts'],
  },
  toast: {
    description: 'Auto-dismissing notifications — success / warning / error / info',
    files: ['Toast.tsx', 'index.ts'],
  },
  'status-indicator': {
    description: 'Animated dot indicator for service/connection health',
    files: ['StatusIndicator.tsx', 'index.ts'],
  },
  'loading-bar': {
    description: 'Slim loading bar — indeterminate bounce or determinate value',
    files: ['LoadingBar.tsx', 'index.ts'],
  },
  confirm: {
    description: 'y/N confirmation prompt with default value',
    files: ['Confirm.tsx', 'index.ts'],
  },
  'key-hint': {
    description: 'Row of [key] label keyboard shortcut hints',
    files: ['KeyHint.tsx', 'index.ts'],
  },
  divider: {
    description: 'Full-width separator — single, double, dashed, bold, optional title',
    files: ['Divider.tsx', 'index.ts'],
  },
  header: {
    description: 'App header bar — box, line, filled styles with title and subtitle',
    files: ['Header.tsx', 'index.ts'],
  },
  panel: {
    description: 'Bordered panel with title — single, double, rounded, bold, ascii',
    files: ['Panel.tsx', 'index.ts'],
  },

  // ── Layout ────────────────────────────────────────────────────────────────
  'scroll-area': {
    description: 'Scrollable content region with visible scrollbar',
    files: ['ScrollArea.tsx', 'index.ts'],
  },
  tabs: {
    description: 'Keyboard-navigable tab panels with underline, boxed, pills variants',
    files: ['Tabs.tsx', 'index.ts'],
  },
  accordion: {
    description: 'Expandable/collapsible sections with keyboard navigation',
    files: ['Accordion.tsx', 'index.ts'],
  },

  // ── AI & Streaming ────────────────────────────────────────────────────────
  'streaming-text': {
    description: 'Token-by-token text rendering with blinking cursor for LLM streaming',
    files: ['StreamingText.tsx', 'index.ts'],
  },
  'token-counter': {
    description: 'Visual token usage display with budget bar — compact/detailed/minimal',
    files: ['TokenCounter.tsx', 'index.ts'],
  },
  'code-block': {
    description: 'Syntax-highlighted code display with line numbers — no external deps',
    files: ['CodeBlock.tsx', 'highlight.ts', 'index.ts'],
  },
  'diff-view': {
    description: 'Unified diff viewer with add/remove highlighting — LCS-based, no deps',
    files: ['DiffView.tsx', 'diff.ts', 'index.ts'],
  },
  typewriter: {
    description: 'Character-by-character text animation with configurable speed',
    files: ['Typewriter.tsx', 'index.ts'],
  },

  // ── Data & Power ──────────────────────────────────────────────────────────
  'tree-view': {
    description: 'Hierarchical collapsible tree with keyboard navigation',
    files: ['TreeView.tsx', 'index.ts'],
  },
  autocomplete: {
    description: 'Text input with filtered dropdown suggestions',
    files: ['Autocomplete.tsx', 'index.ts'],
  },
  stepper: {
    description: 'Multi-step wizard flow with visual progress indicator',
    files: ['Stepper.tsx', 'index.ts'],
  },
  'data-table': {
    description: 'Interactive table with sorting, filtering, and pagination',
    files: ['DataTable.tsx', 'index.ts'],
  },
  gauge: {
    description: 'Semicircular or linear metric gauge — bar, arc, ring variants',
    files: ['Gauge.tsx', 'index.ts'],
  },
  sparkline: {
    description: 'Inline mini chart using block characters for trend data',
    files: ['Sparkline.tsx', 'index.ts'],
  },
  markdown: {
    description: 'Terminal Markdown renderer — headings, lists, code blocks, blockquotes',
    files: ['Markdown.tsx', 'index.ts'],
  },
  'json-viewer': {
    description: 'Interactive JSON explorer with collapsible nodes and syntax coloring',
    files: ['JSONViewer.tsx', 'index.ts'],
  },

  // ── Hooks ─────────────────────────────────────────────────────────────────
  hooks: {
    description: 'Utility hooks — useFocusManager, useKeyBindings, useTerminalSize, useAsync',
    files: ['useFocusManager.ts', 'useKeyBindings.ts', 'useTerminalSize.ts', 'useAsync.ts', 'index.ts'],
  },
};

/** Absolute path to the embedded registry directory for a component. */
export function pkgSrcDir(componentName: string): string {
  return join(registryRoot, componentName);
}

/** All component names, sorted alphabetically. */
export const componentNames = Object.keys(REGISTRY).sort();
