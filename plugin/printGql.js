const { print, stripIgnoredCharacters } = require('graphql');

module.exports = (graphqlAST, { stripIgnoredCharacters: optsFlag = false }) => {
  const graphqlStr = print(graphqlAST);
  return optsFlag ? stripIgnoredCharacters(graphqlStr) : graphqlStr;
};
