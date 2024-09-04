export interface CatalogItem {
  name: string;
  description: string;
  price: number;
  itemImageUrl: string;
  priceHistory: PriceHistoryEntry[];
}

export interface PriceHistoryEntry {
  date: string;
  price: number;
}

export interface CatalogData {
  [category: string]: CatalogItem[];
}
