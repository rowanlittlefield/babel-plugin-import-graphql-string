const { print } = require('graphql/language');

const removeUnnecessaryChars = str => (
  str.replace(/[\r\n,]/g, '')
    .replace(/\s*([{}:$])\s*/g, (_, capture) => capture)
    .replace(/\s{2,}/g, ' ')
);

module.exports = (graphqlAST, { trim = false }) => {
  const graphqlStr = print(graphqlAST);
  return trim ? removeUnnecessaryChars(graphqlStr) : graphqlStr;
};
