import React, { useEffect } from 'react';
import { Box, Text, useApp } from 'ink';
import { Table } from '@inkui-cli/table';
import { Badge } from '@inkui-cli/badge';
import { darkTheme } from '@inkui-cli/core';
import { REGISTRY, componentNames } from '../registry.js';

// Injected at build time by tsup define — see tsup.config.ts
declare const __CLI_VERSION__: string;

type Row = { component: string; description: string };

const rows: Row[] = componentNames.map((name) => ({
  component: name,
  description: REGISTRY[name]!.description,
}));

const columns = [
  { key: 'component'   as const, header: 'Component',   align: 'left'  as const },
  { key: 'description' as const, header: 'Description', align: 'left'  as const },
];

export const ListCommand: React.FC = () => {
  const { exit } = useApp();

  useEffect(() => {
    // Render is synchronous — exit after paint
    const t = setTimeout(() => exit(), 80);
    return () => clearTimeout(t);
  }, [exit]);

  return (
    <Box flexDirection="column" gap={1}>
      <Box gap={2}>
        <Text bold>InkUI</Text>
        <Badge variant="info" theme={darkTheme}>{`v${__CLI_VERSION__}`}</Badge>
        <Text dimColor>shadcn-style terminal components for Ink</Text>
      </Box>

      <Table columns={columns} data={rows} borderStyle="rounded" theme={darkTheme} />

      <Box flexDirection="column">
        <Text dimColor>Usage:</Text>
        <Text>  <Text color="cyan">npx inkui add {'<component>'}</Text>  — copy component source into your project</Text>
        <Text>  <Text color="cyan">npx inkui add --all</Text>            — copy all components</Text>
        <Text>  <Text color="cyan">npx inkui list</Text>                 — show this list</Text>
      </Box>
    </Box>
  );
};
