import pluginTester from 'babel-plugin-tester';
import path from 'path';
import plugin from '../plugin/index.js';

pluginTester({
  plugin,
  pluginName: 'import-graphql-documents',
  title: 'default options',
  fixtures: path.join(__dirname, 'fixtures/default-options'),
});

pluginTester({
  plugin,
  pluginName: 'import-graphql-documents',
  title: 'trim',
  fixtures: path.join(__dirname, 'fixtures/trim'),
  pluginOptions: {
    trim: true,
  },
});
