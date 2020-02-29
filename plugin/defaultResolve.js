// const path = require('path');
const { dirname, parse, resolve } = require('path')

module.exports = (src, file, opts = {}) => {
  if (opts.aliases) {
    const firstDir = parse(src).dir.split('/')[0];
    const firstMatchingAlias = Object.keys(opts.aliases).find((alias) => {
      const match = firstDir.match(alias);
      return match && match[0];
    });
    
    if (firstMatchingAlias) {
      const aliasPath = opts.aliases[firstMatchingAlias];
      return resolve(src.replace(firstMatchingAlias, aliasPath));
    }
  }

  return resolve(dirname(file), src);
};
