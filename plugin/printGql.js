const { print, stripIgnoredCharacters } = require('graphql');

module.exports = (graphqlAST, { stripIgnoredCharacters: stripFlag = false }) => {
  const graphqlStr = print(graphqlAST);
  return stripFlag ? stripIgnoredCharacters(graphqlStr) : graphqlStr;
};
