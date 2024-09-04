import { CatalogData, PriceHistoryEntry } from '@/types/habbo';

export async function fetchCatalogData(): Promise<CatalogData> {
  // Fetch data from database here
  // For now, we'll just return the static data
  return catalogData;
}

// Create a default fallback data for the chart and pass it to the item info component
const chartData: PriceHistoryEntry[] = [
  { date: 'Jan', price: 1.2 },
  { date: 'Feb', price: 1.3 },
  { date: 'March', price: 1.5 },
  { date: 'April', price: 1.4 },
  { date: 'May', price: 1.6 },
  { date: 'June', price: 1.5 },
];

// Keep the static data for fallback or initial loading
export const catalogData: CatalogData = {
  Rares: [
    {
      name: 'Almohadón Púrpura',
      description: 'Enorme, suave y acolchado',
      price: 1,
      itemImageUrl: '/catalog/rares/almolila.png',
      priceHistory: chartData,
    },
    {
      name: 'Aloe Vera',
      description: 'Viva el verde',
      price: 1,
      itemImageUrl: '/catalog/rares/aloe.png',
      priceHistory: chartData,
    },
    {
      name: 'El Césped',
      description: 'Para pisar descalzos',
      price: 1,
      itemImageUrl: '/catalog/rares/cespedvivo.png',
      priceHistory: chartData,
    },
    {
      name: 'La Fontana Mágica',
      description: '¡Todo un Oasis!',
      price: 1,
      itemImageUrl: '/catalog/rares/fontyazul.png',
      priceHistory: chartData,
    },
    {
      name: 'Máquina de Habbo Cola',
      description: '¡Una refrescante y chispeante bebida pixelada!',
      price: 1.5,
      itemImageUrl: '/catalog/rares/habbocola.png',
      priceHistory: chartData,
    },
    {
      name: 'Holoboy',
      description: 'Tantas vueltas',
      price: 1,
      itemImageUrl: '/catalog/rares/holoboy.png',
      priceHistory: chartData,
    },
    {
      name: 'Holo Ángel',
      description: 'Gira, amor, gira',
      price: 2,
      itemImageUrl: '/catalog/rares/hologirl.png',
      priceHistory: chartData,
    },
    {
      name: 'El cascarón del Dragón',
      description: 'Una leyenda se está gestando',
      price: 1.5,
      itemImageUrl: '/catalog/rares/huevodragon.png',
      priceHistory: chartData,
    },
    {
      name: 'La Humareda Roja',
      description: 'Nubes bajo tu techo',
      price: 0.5,
      itemImageUrl: '/catalog/rares/humaredaroja.png',
      priceHistory: chartData,
    },
    {
      name: 'Puerta Láser Roja',
      description: 'Rayo energético ¡Da calambre!',
      price: 1,
      itemImageUrl: '/catalog/rares/laserrojo.png',
      priceHistory: chartData,
    },
    {
      name: 'Luciérnaga Amarilla',
      description: '¡Una luz espectacular!',
      price: 2,
      itemImageUrl: '/catalog/rares/lucyamarilla.png',
      priceHistory: chartData,
    },
  ],
  'Mega Rares': [
    {
      name: 'Dragón de Fuego Bronce',
      description: 'Llamaradas Inquietantes',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/broncedragon.png',
      priceHistory: chartData,
    },
    {
      name: 'Habbo Trofeo Bronce',
      description: 'Habbo Trofeo Bronce',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/bronceht.png',
      priceHistory: chartData,
    },
    {
      name: 'Dragón de Fuego Oro',
      description: 'Llamaradas Inquietantes',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/orodragon.png',
      priceHistory: chartData,
    },
    {
      name: 'Dragón de Fuego Plata',
      description: 'Llamaradas Inquietantes',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/platadragon.png',
      priceHistory: chartData,
    },
    {
      name: 'Ticket',
      description: 'Ticket para Juegos',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/ticketph.png',
      priceHistory: chartData,
    },
    {
      name: 'La Máquina de escribir',
      description: 'Famosa e imprescindible',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/typewriter.png',
      priceHistory: chartData,
    },
  ],
  'Funky Friday': [],
  'HC Rares': [
    {
      name: 'La Cafetera',
      description: '¿Solo o con leche?',
      price: 2,
      itemImageUrl: '/catalog/hc/cafetera.png',
      priceHistory: chartData,
    },
    {
      name: 'El Super Dado',
      description: 'Busca tu número',
      price: 2,
      itemImageUrl: '/catalog/hc/dadohc.png',
      priceHistory: chartData,
    },
    {
      name: 'Imperiales',
      description: 'Viaja al estiro imperial',
      price: 2,
      itemImageUrl: '/catalog/hc/imperiales.png',
      priceHistory: chartData,
    },
    {
      name: 'El Jacuzzy',
      description: '¡Todos a remojo!',
      price: 2,
      itemImageUrl: '/catalog/hc/jacuzzy.png',
      priceHistory: chartData,
    },
    {
      name: 'Majestic Chair',
      description: 'Descanso Real',
      price: 2,
      itemImageUrl: '/catalog/hc/majestic.png',
      priceHistory: chartData,
    },
    {
      name: 'Nordic Table',
      description: 'Perfecta para banquetes',
      price: 2,
      itemImageUrl: '/catalog/hc/nordica.png',
      priceHistory: chartData,
    },
    {
      name: 'Lampara HC',
      description: '¡Iluminado!',
      price: 2,
      itemImageUrl: '/catalog/hc/oil.png',
      priceHistory: chartData,
    },
    {
      name: 'Set HC Azul',
      description: 'Nadie quiere esta mierda',
      price: 2,
      itemImageUrl: '/catalog/hc/sethcazul.png',
      priceHistory: chartData,
    },
    {
      name: 'Study desk',
      description: '¡Para la mejor escuela!',
      price: 2,
      itemImageUrl: '/catalog/hc/study.png',
      priceHistory: chartData,
    },
    {
      name: 'Sofá Trono HC',
      description: 'Buah, ¡esto sí que es cómodo!',
      price: 2,
      itemImageUrl: '/catalog/hc/trono.png',
      priceHistory: chartData,
    },
    {
      name: 'El Club Sofá',
      description: 'Posaderas VIP',
      price: 2,
      itemImageUrl: '/catalog/hc/vip.png',
      priceHistory: chartData,
    },
  ],
};
