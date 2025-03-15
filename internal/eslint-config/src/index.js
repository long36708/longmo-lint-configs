import {
  command,
  comments,
  disableds,
  ignores,
  importPluginConfig,
  javascript,
  jsdoc,
  jsonc,
  node,
  perfectionist,
  prettier,
  regexp,
  testLint,
  turbo,
  typescript,
  unicorn,
  vue,
} from './configs/index.js';
import { customConfig } from './custom-config.js';

async function defineConfig(config = []) {
  const configs = [
    vue(),
    javascript(),
    ignores(),
    prettier(),
    typescript(),
    jsonc(),
    disableds(),
    importPluginConfig(),
    node(),
    perfectionist(),
    comments(),
    jsdoc(),
    unicorn(),
    testLint(),
    regexp(),
    command(),
    // turbo(),
    ...customConfig,
    ...config,
  ];

  const resolved = await Promise.all(configs);

  return resolved.flat();
}

export { defineConfig };
