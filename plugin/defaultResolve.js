const path = require('path');
const { dirname } = require('path')

const defaultResolve = (src, file, opts) => {
  if (opts && opts.aliases) {
    const firstMatchingAlias = src.match(Object.keys(opts.aliases)[0])[0];
    
    if (firstMatchingAlias) {
      const aliasPath = opts.aliases[firstMatchingAlias];
      return path.resolve(src.replace(firstMatchingAlias, aliasPath));
    }
  }

  return path.resolve(dirname(file), src);
}
module.exports.defaultResolve = defaultResolve;