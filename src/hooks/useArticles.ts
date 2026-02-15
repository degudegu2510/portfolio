import { useState, useEffect, useCallback } from 'react';

export interface ArticlesInterface {
  title: string;
  url: string;
  likes_count: number;
  tags: string[];
}

interface QiitaTag {
  name: string;
}

interface QiitaArticle {
  title: string;
  url: string;
  likes_count: number;
  tags: QiitaTag[];
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

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://qiita.com/api/v2/users/degudegu2510/items?page=${page}&per_page=${perPage}`
      );

      if (!response.ok) {
        throw new Error('Qiita APIから記事リストの取得に失敗しました');
      }

      const articlesData: QiitaArticle[] = await response.json();
      const formattedArticles = articlesData.map((article) => ({
        title: article.title,
        url: article.url,
        likes_count: article.likes_count,
        tags: Array.isArray(article.tags) ? article.tags.map((tag) => tag.name) : [],
      }));

      setArticles(formattedArticles);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [page, perPage]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    articles,
    loading,
    error,
    refetch: fetchArticles,
  };
};
