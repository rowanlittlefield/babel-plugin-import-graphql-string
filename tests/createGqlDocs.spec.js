import { join } from 'path';
import { print } from 'graphql/language';
import { createGqlDocs } from '../plugin/createGqlDocs';

describe('createGqlDocs', () => {
  it('should pass', () => {
    const result = createGqlDocs(join(__dirname, './fixtures/mutation/view-article.gql'));
    console.log(result);
    console.log(print(result));
  });

  it('should pass', () => {
    const result = createGqlDocs(join(__dirname, './fixtures/query/user.gql'));
    console.log(result);
  });

  it('should pass', () => {
    const result = createGqlDocs(join(__dirname, './fixtures/query/dashboard-articles.gql'));
    console.log(Object.keys(result));
  });

  it('should pass', () => {
    const result = createGqlDocs(join(__dirname, './fixtures/query/multiple-queries.gql'));
    console.log(Object.keys(result));
    console.log(result.default);
    
  });
});