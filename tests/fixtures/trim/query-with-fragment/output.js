var query =
  "query DASHBOARD_ARTICLES_QUERY{articles{...ArticleListItem}mostViewed{id title views}}fragment ArticleListItem on ArticleType{id title pubDate views author{id username}}";