import { ChartConfig } from '@/components/ui/chart';
import { CatalogData, PriceHistoryEntry } from '@/types/habbo';

export function fetchCatalogData(): CatalogData {
  return catalogData;
}

const priceHistoryChartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

function generateMockPriceHistory(basePrice: number): PriceHistoryEntry[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month) => ({
    date: month,
    price: basePrice * (0.8 + Math.random() * 0.4), // Random fluctuation between 80% and 120% of base price
  }));
}

export const catalogData: CatalogData = {
  Rares: [
    {
      name: 'Almohadón Púrpura',
      description: 'Enorme, suave y acolchado',
      price: 1,
      itemImageUrl: '/catalog/rares/almolila.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Aloe Vera',
      description: 'Viva el verde',
      price: 1,
      itemImageUrl: '/catalog/rares/aloe.png',
      priceHistory: generateMockPriceHistory(1),
    },
    // ... (other items)
  ],
  'Mega Rares': [
    {
      name: 'Dragón de Fuego Bronce',
      description: 'Llamaradas Inquietantes',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/broncedragon.png',
      priceHistory: generateMockPriceHistory(2),
    },
    // ... (other items)
  ],
  'Funky Friday': [],
  'HC Rares': [
    {
      name: 'La Cafetera',
      description: '¿Solo o con leche?',
      price: 2,
      itemImageUrl: '/catalog/hc/cafetera.png',
      priceHistory: generateMockPriceHistory(2),
    },
    // ... (other items)
  ],
};
