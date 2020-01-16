const { print } = require('graphql/language');

const removeChars = str => (
  str.replace(/[\r?\n,]/g, '')
    .replace(/\s{0,}([{])\s{0,}/g, '{')
    .replace(/\s{0,}([}])\s{0,}/g, '}')
    .replace(/\s{2,}/g, ' ')
    .replace(/:\s{1,}/g, ':')
    .replace(/\s{1,}([$])/g, '$')
);

module.exports = (graphqlAST, opts) => {
  const { trim = false } = opts;
  let graphqlStr = print(graphqlAST);

  if (trim) {
    graphqlStr = removeChars(graphqlStr);
  }

  return graphqlStr;
}