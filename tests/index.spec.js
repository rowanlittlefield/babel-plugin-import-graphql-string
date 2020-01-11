import pluginTester from 'babel-plugin-tester';
import path from 'path';
import plugin from '../plugin/index.js';

pluginTester({
  plugin,
  pluginName: 'import-graphql-documents',
  title: 'simple query',
  fixtures: path.join(__dirname, 'fixtures/plugin'),
});
