export type NewsCategory =
  | 'todas'
  | 'mercados'
  | 'macroeconomia'
  | 'cambio'
  | 'empresas'
  | 'agro'
  | 'financas'
  | 'internacional';

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  subtitle: string;
  category: NewsCategory;
  categoryLabel: string;
  author: Author;
  publishedAt: string;
  timestamp: string;
  readTimeMinutes: number;
  leadImage: string;
  imageCaption: string;
  content: string[];
  keyTakeaways: string[];
  tags: string[];
  isBreaking?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  viewsCount: number;
  relatedArticleIds?: string[];
}

export interface MarketIndicator {
  id: string;
  name: string;
  code: string;
  value: number;
  formattedValue: string;
  changePercent: number;
  changeValue: number;
  trend: 'up' | 'down' | 'neutral';
  unit?: string;
  high24h: string;
  low24h: string;
  history: number[];
}

export interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  rateToBRL: number;
}
