const { readFileSync, writeFileSync } = require('fs')
const path = require('path')
const { isAbsolute, join, dirname } = require('path')
const gql = require('graphql-tag')
const { createDocPerOp } = require('./multiOp')
const customImport = require('./customImport')

const defaultResolve = (src, file) => path.resolve(dirname(file), src)
module.exports.defaultResolve = defaultResolve;

module.exports.createGqlDocs = (
  filepath,
  { resolve = defaultResolve, nowrap = true } = {}
) => {
  filepath = isAbsolute(filepath) ? filepath : join(callerDirname(), filepath)
  const source = readFileSync(filepath).toString()

  const doc = processDoc(createDoc(source, filepath, resolve))
  const docsMap = createDocPerOp(doc)

  return nowrap && !doc.isMultiOp ? docsMap.default : docsMap
}

function callerDirname() {
  // To avoid dependencies, I borrowed this from gh (sindresorhus/callsites/blob/master/index.js)
  const _ = Error.prepareStackTrace
  Error.prepareStackTrace = (_, stack) => stack
  const stack = new Error().stack.slice(1)
  Error.prepareStackTrace = _
  // End borrowed code

  const caller = stack.find(c => c.getTypeName() !== null)
  return dirname(caller.getFileName())
}

function createDoc(source, filepath, resolve) {
  let ast = null
  let fragmentDefs = []

  return {
    processFragments() {
      // Resolve all #import statements (fragments) recursively and add them to the definitions
      customImport.getFilepaths(source, filepath, resolve).forEach(fp => {
        fragmentDefs = customImport
          .getSources(fp, resolve)
          .reduce((acc, src) => [...acc, ...gql(src).definitions], fragmentDefs)
      })
    },
    parse() {
      const parsedAST = gql(source)
      parsedAST.definitions = [...parsedAST.definitions, ...fragmentDefs]
      ast = parsedAST
    },
    dedupeFragments() {
      let seenNames = {}
      ast.definitions = ast.definitions.filter(def => {
        if (def.kind !== 'FragmentDefinition') return true
        return seenNames[def.name.value] ? false : (seenNames[def.name.value] = true)
      })
    },
    makeSourceEnumerable() {
      const newAST = JSON.parse(JSON.stringify(ast))
      newAST.loc.source = ast.loc.source
      ast = newAST
    },
    get ast() {
      return ast
    },
    get isMultiOp() {
      const countReducer = (acc, def) => (def.kind === 'OperationDefinition' ? (acc += 1) : acc)
      const opCount = ast.definitions.reduce(countReducer, 0)
      return opCount > 1
    },
    get isOnlyFrags() {
      return ast.definitions.every(d => d.kind === 'FragmentDefinition')
    }
  }
}

function processDoc(doc) {
  doc.processFragments()
  doc.parse()
  doc.dedupeFragments()
  doc.makeSourceEnumerable()
  return doc
}
