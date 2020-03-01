# babel-plugin-import-graphql-string

This package is a Babel plugin that makes `.gql`/`.graphql` files importable as strings/document nodes with all GraphQL import statements resolved. The package is intended for lightweight use cases where the user would like to utilize the GraphQL import syntax without needing access to GraphQL `ASTNode` objects.

## Example

world.gql

```GraphQL
fragment World on HelloType {
  id
}
```

hello.gql

```GraphQL
#import "./world.gql"

query helloQuery {
  hello {
    ...World
  }
}
```

use-query.js
```JS
import helloQuery from './hello.gql';

console.log(helloQuery); // 'query helloQuery { hello { ...World } } fragment World on HelloType { id }
```

***Note:*** Some ignored characters are omitted from the comment above for clarity. See the `stripIgnoredCharacters` option for omitting unnecessary characters from the GraphQL string/document node.

## Features

Currently, this plugin is only intended for use with operation and fragment files (i.e., not schema files). The features supported for operation and fragment files are similar to those provided by [babel-plugin-import-graphql](https://github.com/detrohutt/babel-plugin-import-graphql/blob/master/README.md#operationfragment-files).

## Options

Option | Type | Default | Description
-|-|-|-
`extensions` | Array | `[]` | Enables loading of graphQL files with extensions other than `.graphql` or `.gql`.
`stripIgnoredCharacters` | Boolean | `false` | Removes all unnecessary characters from the compiled graphQL strings when set to `true`.
`aliases` | Object | `{}` | Used to allow the plugin to resolve path aliases, e.g. [webpack aliases](https://webpack.js.org/configuration/resolve/#resolvealias). Each key should consist of an alias with the relative path as the corresponding value, e.g., `{ '@': './src' }`.

## Credits

This package started out as a modified version of [babel-plugin-import-graphql](https://www.npmjs.com/package/babel-plugin-import-graphql).
