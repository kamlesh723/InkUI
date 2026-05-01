import React from 'react';
import { render } from 'ink';
import { ListCommand }       from './commands/List.js';
import { AddCommand }        from './commands/Add.js';
import { HelpCommand }       from './commands/Help.js';
import { PlaygroundCommand } from './commands/Playground.js';
import { ThemeCommand }      from './commands/Theme.js';

const args    = process.argv.slice(2);
const command = args[0];
const targets = args.slice(1);

switch (command) {
  case 'list':
    render(<ListCommand />);
    break;

  case 'add':
    if (targets.length === 0) {
      console.error('Usage: inkui add <component> [components...] | --all');
      process.exit(1);
    }
    render(<AddCommand targets={targets} />);
    break;

  case 'playground':
    render(<PlaygroundCommand />);
    break;

  case 'theme':
    render(<ThemeCommand />);
    break;

  default:
    render(<HelpCommand />);
    break;
}
