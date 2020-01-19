# babel-plugin-import-graphql-string

Babel plugin to make .gql/.graphql files importable as strings/document nodes. Intended for cases where the user would like to make use of the GraphQL import syntax without needing access to graphQL `ASTNode` objects. In this case, compiling imported GraphQL operations to strings rather than `ASTNode` objects can lead to a reduction in bundle size.

## Example

#### Before (without this plugin):

get-articles.js

```JS
import { print } from 'graphql/language';
import gql from 'graphql-tag';
import axios from 'axios';

const articlesQuery = gql`
  query ARTICLES_QUERY {
    articles {
      ...ArticleListItem
    }
    mostViewed {
      id
      title
      views
    }
  }

  fragment ArticleListItem on ArticleType {
    id
    title
    pubDate
    views
    author {
      id
      username
    }
  }
`

axios.post('http://localhost:8080/graphql', {
  query: print(articlesQuery),
}).then(response => console.log(response));
```

#### After (with this plugin):

article-list-item.gql

```GraphQL
fragment ArticleListItem on ArticleType {
  id
  title
  pubDate
  views
  author {
    id
    username
  }
}
```

articles-query.gql

```GraphQL
#import "./article-list-item.gql"

query ARTICLES_QUERY {
  articles {
    ...ArticleListItem
  }
  mostViewed {
    id
    title
    views
  }
}
```

get-articles.js

```JS
import axios from 'axios';
import articlesQuery from './articles-query.gql';

axios.post('http://localhost:8080/graphql', {
  query: articlesQuery, // No need for print, already a string
}).then(response => console.log(response));
```

## Features

Currently, this plugin is only intended for use with operation and fragment files (i.e., not schema files). The features supported for operation and fragment files are similar to those provided by [babel-plugin-import-graphql](https://github.com/detrohutt/babel-plugin-import-graphql/blob/master/README.md#operationfragment-files).

## Options

Option | Type | Default | Description
-|-|-|-
`extensions` | Array | `[]` | Enables loading of graphQL files with extensions other than `.graphql` or `.gql`.
`trim` | Boolean | `false` | Removes all unnecessary characters from the compiled graphQL strings when set to `true`. 

## Credits

This package started out as a modified version of [babel-plugin-import-graphql](https://www.npmjs.com/package/babel-plugin-import-graphql).
