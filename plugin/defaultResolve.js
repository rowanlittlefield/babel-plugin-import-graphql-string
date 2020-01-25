const path = require('path');
const { dirname, parse } = require('path')

module.exports = (src, file, opts = {}) => {
  if (opts.aliases) {
    const firstDir = parse(src).dir.split('/')[0];
    const firstMatchingAlias = Object.keys(opts.aliases).find((alias) => {
      const match = firstDir.match(alias);
      return match && match[0];
    });
    
    if (firstMatchingAlias) {
      const aliasPath = opts.aliases[firstMatchingAlias];
      return path.resolve(src.replace(firstMatchingAlias, aliasPath));
    }
  }

  return path.resolve(dirname(file), src);
};
