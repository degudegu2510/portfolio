import { visit } from 'unist-util-visit';
import type { Root } from 'hast';


const imageFiles: Record<string, string> = import.meta.glob(
  '../contents/Product/**/*.{png,jpg,jpeg,gif,webp,svg}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
) as Record<string, string>;

export function resolveImagePath(imagePath: string, slug: string): string {
  if (!imagePath) {
    return imagePath;
  }

  // 外部URL（http://, https://）の場合はそのまま返す
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // /src/で始まる絶対パスの場合、imageFilesから解決されたURLを取得
  // imageFilesのキーはglobの指定に依存するため、/src と ../ 両方を試す
  if (imagePath.startsWith('/src/')) {
    const relativeKey = imagePath.replace(/^\/src\//, '../');
    const resolvedUrl = imageFiles[imagePath] || imageFiles[relativeKey];
    if (resolvedUrl) {
      return resolvedUrl;
    }
    // 見つからない場合は元のパスを返す（開発時のエラー表示用）
    console.warn(`画像が見つかりません: ${imagePath}`);
    return imagePath;
  }

  // 相対パス（./, ../, またはファイル名のみ）の場合、絶対パスに変換
  let absolutePath: string;
  if (imagePath.startsWith('./') || imagePath.startsWith('../')) {
    // 相対パスを絶対パスに変換（./を削除）
    absolutePath = `/src/contents/Product/${slug}/${imagePath.replace(/^\.\//, '')}`;
  } else if (imagePath.startsWith('/')) {
    // 既に絶対パスの場合（/で始まるが/src/ではない、例: /public/...）
    // これはpublicディレクトリのアセットの可能性があるため、そのまま返す
    return imagePath;
  } else {
    // 相対パス（./なし）の場合
    absolutePath = `/src/contents/Product/${slug}/${imagePath}`;
  }

  // imageFilesから解決されたURLを取得
  const relativeKey = absolutePath.replace(/^\/src\//, '../');
  const resolvedUrl = imageFiles[absolutePath] || imageFiles[relativeKey];
  if (resolvedUrl) {
    return resolvedUrl;
  } else {
    // 見つからない場合は元のパスを保持（開発時のエラー表示用）
    console.warn(`画像が見つかりません: ${absolutePath}`);
    return imagePath;
  }
}

/**
 * markdown内の画像パスを解決するrehypeプラグイン
 * 
 * markdown内の画像タグのsrc属性を、Viteの静的アセットの取り扱いに従って解決します。
 * 相対パス（例: ./img/image.png）をViteが解決したURLに変換します。
 * 
 * 参考: https://ja.vite.dev/guide/assets
 * 
 * @param slug - プロダクトのスラッグ
 */
export function rehypeImageResolver(slug: string) {
  return () => {
    return (tree: Root) => {
      visit(tree, 'element', (node) => {
        if (node.tagName === 'img' && node.properties) {
          const src = node.properties.src as string;
          
          if (src && typeof src === 'string') {
            const resolvedUrl = resolveImagePath(src, slug);
            node.properties.src = resolvedUrl;
          }
        }
      });
    };
  };
}
