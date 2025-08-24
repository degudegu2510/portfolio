export interface ArticleListInterface {
  title: string;
  url: string;
  likes_count: number;
  tags: string[];
}

export const getArticleList = async (
  page: number = 1,
  perPage: number = 20
): Promise<ArticleListInterface[]> => {
  const response = await fetch(`https://qiita.com/api/v2/users/degudegu2510/items?page=${page}&per_page=${perPage}`);
  
  if (!response.ok) {
    throw new Error('Qiita APIから記事リストの取得に失敗しました');
  }
  
  const articles = await response.json();

  return articles.map((article: any) => ({
    title: article.title,
    url: article.url,
    likes_count: article.likes_count,
    tags: Array.isArray(article.tags) ? article.tags.map((tag: any) => tag.name) : [],
  }));
}
