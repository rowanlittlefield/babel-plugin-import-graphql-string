const { print, stripIgnoredCharacters, visit } = require('graphql');

const TYPENAME_NODE = {
  kind: 'Field',
  name: {
    kind: 'Name',
    value: '__typename',
  },
};

const addTypeNames = (graphqlAST) => {
  return visit(graphqlAST, {
    Field: {
      enter(node) {          
        const { selectionSet } = node;
        if (selectionSet && selectionSet.selections.every(el => el.name.value !== '__typename')) {                    
          return {
            ...node,
            selectionSet: {
              ...selectionSet,
              selections: [ ...selectionSet.selections, TYPENAME_NODE],
            },
          };
        }
      },
    },
  });
};

module.exports = (graphqlAST, opts) => {
  const {
    includeTypeNames,
    stripIgnoredCharacters: stripFlag,
   } = opts;

  const modifiedGraphqlAST = includeTypeNames ? addTypeNames(graphqlAST) : graphqlAST;
  const graphqlStr = print(modifiedGraphqlAST);
  return stripFlag ? stripIgnoredCharacters(graphqlStr) : graphqlStr;
};
