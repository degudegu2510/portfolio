import { useEffect } from 'react';
import { useLocation } from 'react-router';

export interface HeadMeta {
  title: string;
  description: string;
  url: string;
  keywords?: string;
  ogp?: string;
}

const defaultMeta: HeadMeta = {
  title: 'degudegu2510のポートフォリオ',
  description: 'degudegu2510のポートフォリオサイト。degudegu2510は、Qiita株式会社デザインGのマネージャーで、Qiitaのプロダクトマネジメントをしている。UI・フロントエンド周りのことを発信しているデザインテクノロジスト。',
  url: '/',
  keywords: 'degudegu2510, 出口 裕貴, portfolio, DesignTechnologist, デザインテクノロジスト',
  ogp: 'https://degudegu2510.github.io/portfolio/image-ogp.png',
};

export const useHead = (meta: Partial<HeadMeta> = {}) => {
  const location = useLocation();

  useEffect(() => {
    const mergedMeta = { ...defaultMeta, ...meta };
    const currentUrl = `https://degudegu2510.github.io/portfolio${mergedMeta.url}`;

    document.title = mergedMeta.title;
    updateMetaTag('name', 'author', 'degudegu2510');
    updateMetaTag('name', 'description', mergedMeta.description);
    updateMetaTag('name', 'keywords', mergedMeta.keywords);

    // OGP
    updateMetaTag('property', 'og:title', mergedMeta.title);
    updateMetaTag('property', 'og:description', mergedMeta.description);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:image', mergedMeta.ogp);

    // Twitter Card
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', mergedMeta.title);
    updateMetaTag('name', 'twitter:description', mergedMeta.description);
    updateMetaTag('name', 'twitter:image', mergedMeta.ogp);

  }, [location.pathname, JSON.stringify(meta)]);
};

const updateMetaTag = (attribute: 'name' | 'property', key: string, value?: string) => {
  if (!value) return;

  const selector = attribute === 'name' 
    ? `meta[name="${key}"]` 
    : `meta[property="${key}"]`;
  
  let element = document.querySelector(selector) as HTMLMetaElement;
  
  if (!element) {
    element = document.createElement('meta');
    if (attribute === 'name') {
      element.setAttribute('name', key);
    } else {
      element.setAttribute('property', key);
    }
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', value);
};
