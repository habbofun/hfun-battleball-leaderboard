import { CatalogData, PriceHistoryEntry } from '@/types/habbo';

export async function fetchCatalogData(): Promise<CatalogData> {
  // Fetch data from database here
  return catalogData;
}

function generateMockPriceHistory(basePrice: number): PriceHistoryEntry[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month) => ({
    date: month,
    price: basePrice * (0.8 + Math.random() * 0.4), // Random fluctuation between 80% and 120% of base price
  }));
}

/* const chartData: PriceHistoryEntry[] = [
  { date: 'Jan', price: 1.2 },
  { date: 'Feb', price: 1.3 },
  { date: 'March', price: 1.5 },
  { date: 'April', price: 1.4 },
  { date: 'May', price: 1.6 },
  { date: 'June', price: 1.5 },
]; */

export const catalogData: CatalogData = {
  Rares: [
    {
      name: 'Almohadón Púrpura',
      description: 'Enorme, suave y acolchado',
      price: 1,
      itemImageUrl: '/catalog/rares/almolila.png',
      priceHistory: generateMockPriceHistory(1.2),
    },
    {
      name: 'Aloe Vera',
      description: 'Viva el verde',
      price: 1,
      itemImageUrl: '/catalog/rares/aloe.png',
      priceHistory: generateMockPriceHistory(0.8),
    },
    {
      name: 'El Césped',
      description: 'Para pisar descalzos',
      price: 1,
      itemImageUrl: '/catalog/rares/cespedvivo.png',
      priceHistory: generateMockPriceHistory(1.5),
    },
    {
      name: 'La Fontana Mágica',
      description: '¡Todo un Oasis!',
      price: 1,
      itemImageUrl: '/catalog/rares/fontyazul.png',
      priceHistory: generateMockPriceHistory(1.3),
    },
    {
      name: 'Máquina de Habbo Cola',
      description: '¡Una refrescante y chispeante bebida pixelada!',
      price: 1.5,
      itemImageUrl: '/catalog/rares/habbocola.png',
      priceHistory: generateMockPriceHistory(1.7),
    },
    {
      name: 'Holoboy',
      description: 'Tantas vueltas',
      price: 1,
      itemImageUrl: '/catalog/rares/holoboy.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Holo Ángel',
      description: 'Gira, amor, gira',
      price: 2,
      itemImageUrl: '/catalog/rares/hologirl.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'El cascarón del Dragón',
      description: 'Una leyenda se está gestando',
      price: 1.5,
      itemImageUrl: '/catalog/rares/huevodragon.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'La Humareda Roja',
      description: 'Nubes bajo tu techo',
      price: 0.5,
      itemImageUrl: '/catalog/rares/humaredaroja.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Puerta Láser Roja',
      description: 'Rayo energético ¡Da calambre!',
      price: 1,
      itemImageUrl: '/catalog/rares/laserrojo.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Luciérnaga Amarilla',
      description: '¡Una luz espectacular!',
      price: 2,
      itemImageUrl: '/catalog/rares/lucyamarilla.png',
      priceHistory: generateMockPriceHistory(1),
    },
  ],
  'Mega Rares': [
    {
      name: 'Dragón de Fuego Bronce',
      description: 'Llamaradas Inquietantes',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/broncedragon.png',
      priceHistory: generateMockPriceHistory(2.5),
    },
    {
      name: 'Habbo Trofeo Bronce',
      description: 'Habbo Trofeo Bronce',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/bronceht.png',
      priceHistory: generateMockPriceHistory(2.2),
    },
    {
      name: 'Dragón de Fuego Oro',
      description: 'Llamaradas Inquietantes',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/orodragon.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Dragón de Fuego Plata',
      description: 'Llamaradas Inquietantes',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/platadragon.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Ticket',
      description: 'Ticket para Juegos',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/ticketph.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'La Máquina de escribir',
      description: 'Famosa e imprescindible',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/typewriter.png',
      priceHistory: generateMockPriceHistory(1),
    },
  ],
  'Funky Friday': [],
  'HC Rares': [
    {
      name: 'La Cafetera',
      description: '¿Solo o con leche?',
      price: 2,
      itemImageUrl: '/catalog/hc/cafetera.png',
      priceHistory: generateMockPriceHistory(1.8),
    },
    {
      name: 'El Super Dado',
      description: 'Busca tu número',
      price: 2,
      itemImageUrl: '/catalog/hc/dadohc.png',
      priceHistory: generateMockPriceHistory(2.1),
    },
    {
      name: 'Imperiales',
      description: 'Viaja al estiro imperial',
      price: 2,
      itemImageUrl: '/catalog/hc/imperiales.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'El Jacuzzy',
      description: '¡Todos a remojo!',
      price: 2,
      itemImageUrl: '/catalog/hc/jacuzzy.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Majestic Chair',
      description: 'Descanso Real',
      price: 2,
      itemImageUrl: '/catalog/hc/majestic.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Nordic Table',
      description: 'Perfecta para banquetes',
      price: 2,
      itemImageUrl: '/catalog/hc/nordica.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Lampara HC',
      description: '¡Iluminado!',
      price: 2,
      itemImageUrl: '/catalog/hc/oil.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Set HC Azul',
      description: 'Nadie quiere esta mierda',
      price: 2,
      itemImageUrl: '/catalog/hc/sethcazul.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Study desk',
      description: '¡Para la mejor escuela!',
      price: 2,
      itemImageUrl: '/catalog/hc/study.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Sofá Trono HC',
      description: 'Buah, ¡esto sí que es cómodo!',
      price: 2,
      itemImageUrl: '/catalog/hc/trono.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'El Club Sofá',
      description: 'Posaderas VIP',
      price: 2,
      itemImageUrl: '/catalog/hc/vip.png',
      priceHistory: generateMockPriceHistory(1),
    },
  ],
};
