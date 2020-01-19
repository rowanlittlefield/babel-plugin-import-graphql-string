const { print } = require('graphql/language');

const removeChars = str => (
  str.replace(/[\r\n,]/g, '')
    .replace(/\s*([{}:$])\s*/g, (_, capture) => capture)
    .replace(/\s{2,}/g, ' ')
);

module.exports = (graphqlAST, opts) => {
  const { trim = false } = opts;
  let graphqlStr = print(graphqlAST);

  if (trim) {
    graphqlStr = removeChars(graphqlStr);
  }

  return graphqlStr;
}
