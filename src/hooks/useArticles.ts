import { useState, useEffect } from 'react';

export interface ArticlesInterface {
  title: string;
  url: string;
  likes_count: number;
  tags: string[];
}

export interface UseArticlesResult {
  articles: ArticlesInterface[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useArticles = (page: number = 1, perPage: number = 20): UseArticlesResult => {
  const [articles, setArticles] = useState<ArticlesInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://qiita.com/api/v2/users/degudegu2510/items?page=${page}&per_page=${perPage}`
      );

      if (!response.ok) {
        throw new Error('Qiita APIから記事リストの取得に失敗しました');
      }

      const articlesData = await response.json();
      const formattedArticles = articlesData.map((article: any) => ({
        title: article.title,
        url: article.url,
        likes_count: article.likes_count,
        tags: Array.isArray(article.tags) ? article.tags.map((tag: any) => tag.name) : [],
      }));

      setArticles(formattedArticles);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [page, perPage]);

  return {
    articles,
    loading,
    error,
    refetch: fetchArticles,
  };
};
