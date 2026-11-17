// "Trading Dashboard" becomes "trading-dashboard" for use in URLs
export const slugOf = (text: string): string =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
