import sanitizeHtml from 'sanitize-html';

export const sanitize = (dirty: string): string => {
  return sanitizeHtml(dirty, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    allowedAttributes: {
      a: ['href'],
    },
  });
};
