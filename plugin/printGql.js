const { print } = require('graphql/language');

const removeChars = (str) => {
  return str.replace(/\r?\n/g, '')
    .replace(/\s{0,}([{])\s{0,}/g, '{')
    .replace(/\s{0,}([}])\s{0,}/g, '}')
    .replace(/\s{2,}/g, ' ');
}

module.exports = (graphqlAST, opts) => {
  const { trim = false } = opts;
  let graphqlStr = print(graphqlAST);

  if (trim) {
    graphqlStr = removeChars(graphqlStr);
  }

  return graphqlStr;
}