# @inkui-cli/accordion

## 0.2.0

### Minor Changes

- 954f467: Phase 3: 17 new components and 4 hooks

  **Phase 3A — Layout & Navigation**

  - `ScrollArea` — scrollable region with visible scrollbar and keyboard navigation
  - `Tabs` — tab panels with underline/boxed/pills variants, badge counts, disabled tabs
  - `Accordion` — expand/collapse sections, single or multiple open
  - `Panel` — added `SplitPane` component for flex-ratio split layouts

  **Phase 3B — AI-Era Components**

  - `StreamingText` — token-by-token LLM output with blinking cursor
  - `TokenCounter` — token budget bar with green→yellow→red thresholds
  - `CodeBlock` — syntax highlighting for 13 languages, no external deps
  - `DiffView` — unified diff viewer using a built-in LCS algorithm
  - `Typewriter` — character-by-character text animation

  **Phase 3C — Data & Power**

  - `TreeView` — collapsible tree with vim-style keyboard navigation
  - `Autocomplete` — live-filter input with dropdown, Tab-to-complete
  - `Stepper` — multi-step wizard progress indicator
  - `DataTable` — sort, filter, paginate, row selection
  - `Gauge` — metric bar with configurable color thresholds
  - `Sparkline` — inline `▁▂▃▄▅▆▇█` mini chart
  - `Markdown` — terminal Markdown renderer
  - `JSONViewer` — interactive JSON explorer with expand/collapse

  **Phase 3D — Hooks**

  - `useFocusManager` — register/unregister focus regions
  - `useKeyBindings` — declarative key binding map
  - `useTerminalSize` — live terminal columns/rows with resize tracking
  - `useAsync` — async data fetching with loading/data/error state
