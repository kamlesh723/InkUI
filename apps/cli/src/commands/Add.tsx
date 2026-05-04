import React, { useState, useEffect } from 'react';
import { Box, Text, useApp } from 'ink';
import { Spinner } from '@inkui-cli/spinner';
import { Badge } from '@inkui-cli/badge';
import { darkTheme } from '@inkui-cli/core';
import { copyFile, mkdir } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { existsSync } from 'node:fs';
import { REGISTRY, componentNames, pkgSrcDir } from '../registry.js';

interface FileResult {
  name: string;
  ok: boolean;
  error?: string;
}

interface ComponentResult {
  component: string;
  destDir: string;
  files: FileResult[];
  skipped?: string; // reason if not attempted
  peerDeps?: string[]; // npm packages user must install
}

async function copyComponent(
  componentName: string,
  cwd: string,
): Promise<ComponentResult> {
  const entry   = REGISTRY[componentName];
  const uiDir   = join(cwd, 'components', 'ui');
  const destDir = join(uiDir, componentName);

  if (!entry) {
    return {
      component: componentName,
      destDir,
      files: [],
      skipped: `unknown component "${componentName}"`,
    };
  }

  const srcDir = pkgSrcDir(componentName);

  if (!existsSync(srcDir)) {
    return {
      component: componentName,
      destDir,
      files: [],
      skipped: `source not found at ${srcDir} — run pnpm build first`,
    };
  }

  await mkdir(destDir, { recursive: true });

  const registryRoot = dirname(srcDir);
  // Copy _core.ts to the components/ui folder (it provides theme & tokens)
  if (!existsSync(join(uiDir, '_core.ts'))) {
    try {
      await copyFile(join(registryRoot, '_core.ts'), join(uiDir, '_core.ts'));
    } catch (err) {
      return {
        component: componentName,
        destDir,
        files: [],
        skipped: `failed to copy _core.ts — ${err instanceof Error ? err.message : String(err)}`,
      };
    }
  }

  const files: FileResult[] = await Promise.all(
    entry.files.map(async (filename) => {
      try {
        await copyFile(join(srcDir, filename), join(destDir, filename));
        return { name: filename, ok: true };
      } catch (err) {
        return {
          name: filename,
          ok: false,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }),
  );

  return {
    component: componentName,
    destDir,
    files,
    peerDeps: entry.peerDeps,
  };
}

// ─── component result display ────────────────────────────────────────────────

function toRelDisplay(absPath: string): string {
  return './' + relative(process.cwd(), absPath).replace(/\\/g, '/');
}

const ResultBlock: React.FC<{ result: ComponentResult }> = ({ result }) => {
  const relDest = toRelDisplay(result.destDir);

  if (result.skipped) {
    return (
      <Box gap={1}>
        <Badge variant="warning" theme={darkTheme}>skip</Badge>
        <Text>{result.component}</Text>
        <Text dimColor>— {result.skipped}</Text>
      </Box>
    );
  }

  const allOk = result.files.every((f) => f.ok);

  return (
    <Box flexDirection="column">
      <Box gap={1}>
        <Badge variant={allOk ? 'success' : 'error'} theme={darkTheme}>
          {allOk ? ' ok ' : 'fail'}
        </Badge>
        <Text bold>{result.component}</Text>
        <Text dimColor>→ {relDest}</Text>
      </Box>
      {result.files.map((f) => (
        <Box key={f.name} gap={1} marginLeft={2}>
          <Text color={f.ok ? darkTheme.colors.success : darkTheme.colors.error}>
            {f.ok ? '✔' : '✖'}
          </Text>
          <Text dimColor={!f.ok}>{f.name}</Text>
          {f.error ? <Text color={darkTheme.colors.error}>{f.error}</Text> : null}
        </Box>
      ))}
    </Box>
  );
};

// ─── add command ─────────────────────────────────────────────────────────────

export interface AddCommandProps {
  /** Component names or '--all' */
  targets: string[];
}

type Phase = 'running' | 'done';

export const AddCommand: React.FC<AddCommandProps> = ({ targets }) => {
  const { exit } = useApp();
  const [phase, setPhase]     = useState<Phase>('running');
  const [results, setResults] = useState<ComponentResult[]>([]);
  const [current, setCurrent] = useState('');

  useEffect(() => {
    const names = targets.includes('--all') ? componentNames : targets;

    (async () => {
      const out: ComponentResult[] = [];
      for (const name of names) {
        setCurrent(name);
        const res = await copyComponent(name, process.cwd());
        out.push(res);
      }
      setResults(out);
      setPhase('done');
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (phase !== 'done') return;
    const t = setTimeout(() => exit(), 120);
    return () => clearTimeout(t);
  }, [phase, exit]);

  const totalFiles = results.reduce((s, r) => s + r.files.filter((f) => f.ok).length, 0);

  return (
    <Box flexDirection="column" gap={1}>
      <Box gap={2}>
        <Text bold>InkUI</Text>
        <Badge variant="info" theme={darkTheme}>add</Badge>
      </Box>

      {phase === 'running' ? (
        <Box gap={1}>
          <Spinner type="dots" theme={darkTheme} />
          <Text dimColor>Adding {current}…</Text>
        </Box>
      ) : null}

      {results.map((r) => (
        <ResultBlock key={r.component} result={r} />
      ))}

      {phase === 'done' ? (
        <Box flexDirection="column" marginTop={1}>
          <Text color={darkTheme.colors.success}>
            ✔ Done — {totalFiles} file{totalFiles !== 1 ? 's' : ''} added
          </Text>
          {results
            .filter((r) => !r.skipped && r.files.some((f) => f.ok))
            .map((r) => (
              <Text key={r.component} dimColor>
                {'  '}import {'{ … }'} from &apos;{toRelDisplay(r.destDir)}&apos;
              </Text>
            ))}
          {results
            .filter((r) => r.peerDeps && r.peerDeps.length > 0 && !r.skipped)
            .map((r) => (
              <Text key={r.component} color={darkTheme.colors.warning}>
                {'  '}⚠  {r.component} requires: npm install {r.peerDeps!.join(' ')}
              </Text>
            ))}
        </Box>
      ) : null}
    </Box>
  );
};
