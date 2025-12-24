import { useState, useEffect } from 'react';
import matter from 'gray-matter';
import { resolveImagePath } from '../utils/rehypeImageResolver';

const productFiles = import.meta.glob('/src/contents/Product/**/*.md', {
  eager: true,
  as: 'raw',
});

export interface ProductListItem {
  title: string;
  thumbnail: string;
  slug: string;
}

export interface UseProductListResult {
  products: ProductListItem[];
  loading: boolean;
  error: string | null;
}

export const useProductList = (): UseProductListResult => {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const productList: ProductListItem[] = [];

        Object.entries(productFiles).forEach(([filePath, content]) => {
          try {
            const slug = filePath.split('/').pop()?.replace('.md', '') || '';
            const { data: frontmatter } = matter(content as string);
            const thumbnailPath = frontmatter.thumbnail as string || '';
            
            productList.push({
              title: frontmatter.title || '',
              thumbnail: resolveImagePath(thumbnailPath, slug),
              slug: slug,
            });
          } catch (err) {
            console.warn(`Failed to parse product file: ${filePath}`, err);
          }
        });

        setProducts(productList);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'プロダクトリストの読み込みに失敗しました');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
  };
};
