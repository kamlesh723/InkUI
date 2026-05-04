import React, { useEffect } from 'react';
import { Box, Text, useApp } from 'ink';
import { Badge } from '@inkui-cli/badge';
import { darkTheme } from '@inkui-cli/core';

// Injected at build time by tsup define — see tsup.config.ts
declare const __CLI_VERSION__: string;

export const HelpCommand: React.FC = () => {
  const { exit } = useApp();
  useEffect(() => {
    const t = setTimeout(() => exit(), 80);
    return () => clearTimeout(t);
  }, [exit]);

  return (
    <Box flexDirection="column" gap={1}>
      <Box gap={2}>
        <Text bold>InkUI</Text>
        <Badge variant="info" theme={darkTheme}>{`v${__CLI_VERSION__}`}</Badge>
      </Box>

      <Box flexDirection="column">
        <Text dimColor>Commands:</Text>
        <Text>  <Text color="cyan" bold>inkui list</Text></Text>
        <Text dimColor>    List all available components</Text>

        <Text>  <Text color="cyan" bold>inkui add {'<component>'}</Text></Text>
        <Text dimColor>    Copy component source into ./components/ui/</Text>

        <Text>  <Text color="cyan" bold>inkui add --all</Text></Text>
        <Text dimColor>    Copy all components</Text>

        <Text>  <Text color="cyan" bold>inkui playground</Text></Text>
        <Text dimColor>    Interactive component browser — Storybook for the terminal</Text>

        <Text>  <Text color="cyan" bold>inkui theme</Text></Text>
        <Text dimColor>    Visual theme builder — pick colors and export inkui.theme.ts</Text>
      </Box>

      <Box flexDirection="column">
        <Text dimColor>Examples:</Text>
        <Text dimColor>  npx inkui add spinner</Text>
        <Text dimColor>  npx inkui add table</Text>
        <Text dimColor>  npx inkui add --all</Text>
        <Text dimColor>  npx inkui playground</Text>
      </Box>
    </Box>
  );
};
