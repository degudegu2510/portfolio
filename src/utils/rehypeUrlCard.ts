import { visit } from 'unist-util-visit';
import type { Root, Element, Text } from 'hast';
import type { Plugin } from 'unified';

function isAbsoluteUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function getTextContent(node: Element): string {
  return node.children
    .map(child => {
      if (child.type === 'text') return (child as Text).value;
      if (child.type === 'element') return getTextContent(child as Element);
      return '';
    })
    .join('');
}

// Paragraphs that contain only a bare URL (not [text](url)) are transformed
// into <div class="link-card" data-url="..."> for OGP card rendering.
export const rehypeUrlCard: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'p') return;

      const children = node.children.filter(
        c => !(c.type === 'text' && (c as Text).value.trim() === '')
      );

      if (children.length !== 1) return;

      const child = children[0];
      if (child.type !== 'element' || (child as Element).tagName !== 'a') return;

      const anchor = child as Element;
      const href = anchor.properties?.href as string;
      if (!href || !isAbsoluteUrl(href)) return;

      const text = getTextContent(anchor);
      if (text !== href) return;

      node.tagName = 'div';
      node.properties = {
        className: ['link-card'],
        dataUrl: href,
      };
      node.children = [
        {
          type: 'element',
          tagName: 'a',
          properties: {
            href,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: ['link-card-fallback'],
          },
          children: [{ type: 'text', value: href }],
        },
      ];
    });
  };
};
