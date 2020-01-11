import pluginTester from 'babel-plugin-tester';
import path from 'path';
import plugin from '../build/index.js';

pluginTester({
  plugin,
  pluginName: 'myPluggin',
  fixtures: path.join(__dirname, 'fixtures/plugin'),
});
