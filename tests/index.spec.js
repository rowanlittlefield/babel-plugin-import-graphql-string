import pluginTester from 'babel-plugin-tester';
import path from 'path';
import plugin from '../plugin/index.js';

pluginTester({
  plugin,
  pluginName: 'import-graphql-string',
  title: 'default options',
  fixtures: path.join(__dirname, 'fixtures/default-options'),
});

pluginTester({
  plugin,
  pluginName: 'import-graphql-string',
  title: 'stripIgnoredCharacters',
  fixtures: path.join(__dirname, 'fixtures/strip-ignored-characters'),
  pluginOptions: {
    stripIgnoredCharacters: true,
  },
});

pluginTester({
  plugin,
  pluginName: 'import-graphql-string',
  title: 'aliases',
  fixtures: path.join(__dirname, 'fixtures/aliases'),
  pluginOptions: {
    aliases: {
      'fixtures': './tests/fixtures',
      '@': './tests',
    },
  },
});
