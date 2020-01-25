const { existsSync } = require('fs');
const { createGqlDocs } = require('./createGqlDocs');
const defaultResolve = require('./defaultResolve');
const printGql = require('./printGql');

let resolve
let seenJSFiles = new Set()
module.exports = ({ types: t, template }) => ({
  manipulateOptions({ resolveModuleSource }) {
    resolve = resolveModuleSource || defaultResolve
  },
  visitor: {
    ImportDeclaration: {
      exit(curPath, { opts, file }) {
        const importPath = curPath.node.source.value
        const jsFilename = file.opts.filename
        let { extensions = [] } = opts

        extensions = [...extensions, '.graphql', '.gql']

        if (extensions.some(extension => importPath.endsWith(extension))) {
          // Find the file, using node resolution/NODE_PATH if necessary.
          const fallbackPaths = [process.env.NODE_PATH];

          let absPath = resolve(importPath, jsFilename, opts)
          if (!existsSync(absPath)) absPath = require.resolve(importPath, { paths: fallbackPaths })

          // Analyze the file, returning a map of names to GraphQL Documents
          const result = createGqlDocs(absPath, { resolve, nowrap: false })

          const importNames = curPath.node.specifiers
          const replacements = buildReplacements(result, importNames, opts, seenJSFiles)
          replacements.length > 1
            ? curPath.replaceWithMultiple(replacements)
            : curPath.replaceWith(replacements[0])
        }

        function buildReplacements(docs, specifiers, opts, seenJSFiles) {
          let replacements = []

          seenJSFiles.add(jsFilename)

          const varNodes = specifiers.map(({ type, imported, local }) => {
            switch (type) {
              case 'ImportDefaultSpecifier':
                return buildVarNode(docs.default, local.name)
              case 'ImportSpecifier':
                return buildVarNode(docs[imported.name] || docs.default, local.name)
              case 'ImportNamespaceSpecifier':
                return buildVarNode(docs, local.name)
              default:
                throw new Error(`Unexpected import specifier type: ${type}`)
            }
          })

          return [...replacements, ...varNodes]
        }

        function buildVarNode(graphqlAST, importName) {
          if (graphqlAST.default) {
            const properties = Object.entries(graphqlAST).map(([key, value]) => {
              return t.objectProperty(t.stringLiteral(key), t.stringLiteral(printGql(value, opts)))
            })
            return template('var IMPORT_NAME = SOURCE', { sourceType: 'module' })({
              IMPORT_NAME: t.identifier(importName),
              SOURCE: t.objectExpression(properties)
            })
          }

          const buildNode = template('var IMPORT_NAME = SOURCE;', { sourceType: 'module' })
          return buildNode({
            IMPORT_NAME: t.identifier(importName),
            SOURCE: t.stringLiteral(printGql(graphqlAST, opts))
          })
        }
      }
    }
  }
})
