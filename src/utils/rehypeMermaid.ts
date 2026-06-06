import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';
import type { Plugin } from 'unified';

// Transform <pre><code class="language-mermaid">...</code></pre>
// into <pre class="mermaid">...</pre> so mermaid.js can pick it up
export const rehypeMermaid: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (
        node.tagName === 'pre' &&
        node.children.length === 1 &&
        node.children[0].type === 'element' &&
        (node.children[0] as Element).tagName === 'code'
      ) {
        const code = node.children[0] as Element;
        const className = code.properties?.className as string[] | undefined;
        if (className?.includes('language-mermaid')) {
          node.properties = { className: ['mermaid'] };
          node.children = code.children;
        }
      }
    });
  };
};
