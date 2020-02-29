const { dirname, parse, resolve } = require('path')

module.exports = (src, file, opts = {}) => {
  const { aliases } = opts;
  
  if (aliases) {
    const firstDir = parse(src).dir.split('/')[0];
    const matchingAlias = Object.keys(aliases).find(alias => alias === firstDir);
    
    if (matchingAlias) {
      const aliasPath = aliases[matchingAlias];
      return resolve(src.replace(matchingAlias, aliasPath));
    }
  }

  return resolve(dirname(file), src);
};
