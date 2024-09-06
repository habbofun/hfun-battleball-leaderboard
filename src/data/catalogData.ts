import { CatalogData, PriceHistoryEntry } from '@/types/habbo.d';

export async function fetchCatalogData(): Promise<CatalogData> {
  // Fetch data from database here
  return catalogData;
}

function generateMockPriceHistory(basePrice: number): PriceHistoryEntry[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month) => ({
    date: month,
    price: Number((basePrice * (0.8 + Math.random() * 0.4)).toFixed(2)), // Random fluctuation between 80% and 120% of base price, rounded to 2 decimal places
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
      price: 1.5,
      imageUrl: '/catalog/rares/almolila.png',
      priceHistory: generateMockPriceHistory(1.2),
    },
    {
      name: 'Aloe Vera',
      description: 'Viva el verde',
      price: 1,
      imageUrl: '/catalog/rares/aloe.png',
      priceHistory: generateMockPriceHistory(0.8),
    },
    {
      name: 'El Césped',
      description: 'Para pisar descalzos',
      price: 1.2,
      imageUrl: '/catalog/rares/cespedvivo.png',
      priceHistory: generateMockPriceHistory(1.5),
    },
    {
      name: 'La Fontana Mágica',
      description: '¡Todo un Oasis!',
      price: 1.2,
      imageUrl: '/catalog/rares/fontyazul.png',
      priceHistory: generateMockPriceHistory(1.3),
    },
    {
      name: 'Máquina de Habbo Cola',
      description: '¡Una refrescante y chispeante bebida pixelada!',
      price: 2,
      imageUrl: '/catalog/rares/habbocola.png',
      priceHistory: generateMockPriceHistory(1.7),
    },
    {
      name: 'Hamaca zZz',
      description: 'Tus párpados pesan',
      price: 1,
      imageUrl: '/catalog/rares/hammock.png',
      priceHistory: generateMockPriceHistory(1.7),
    },
    {
      name: 'La Heladera Dorada',
      description: '¡La vainilla virtual mola!',
      price: 0.5,
      imageUrl: '/catalog/rares/heladeradorada.png',
      priceHistory: generateMockPriceHistory(1.7),
    },
    {
      name: 'Holoboy',
      description: 'Tantas vueltas',
      price: 1,
      imageUrl: '/catalog/rares/holoboy.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Holo Ángel',
      description: 'Gira, amor, gira',
      price: 2,
      imageUrl: '/catalog/rares/hologirl.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'El cascarón del Dragón',
      description: 'Una leyenda se está gestando',
      price: 1.8,
      imageUrl: '/catalog/rares/huevodragon.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'La Humareda Roja',
      description: 'Nubes bajo tu techo',
      price: 0.4,
      imageUrl: '/catalog/rares/humaredaroja.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Puerta Láser Roja',
      description: 'Rayo energético ¡Da calambre!',
      price: 1.5,
      imageUrl: '/catalog/rares/laserrojo.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Luciérnaga Amarilla',
      description: '¡Una luz espectacular!',
      price: 1.75,
      imageUrl: '/catalog/rares/lucyamarilla.png',
      priceHistory: generateMockPriceHistory(1),
    },
  ],
  'Mega Rares': [
    {
      name: 'Dragón de Fuego Bronce',
      description: 'Llamaradas Inquietantes',
      price: 150,
      imageUrl: '/catalog/mega-rare/broncedragon.png',
      priceHistory: generateMockPriceHistory(2.5),
    },
    {
      name: 'Habbo Trofeo Bronce',
      description: 'Habbo Trofeo Bronce',
      price: 0,
      imageUrl: '/catalog/mega-rare/bronceht.png',
      priceHistory: generateMockPriceHistory(2.2),
    },
    {
      name: 'Dragón de Fuego Oro',
      description: 'Llamaradas Inquietantes',
      price: 800,
      imageUrl: '/catalog/mega-rare/orodragon.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Dragón de Fuego Plata',
      description: 'Llamaradas Inquietantes',
      price: 400,
      imageUrl: '/catalog/mega-rare/platadragon.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Ticket',
      description: 'Ticket para Juegos',
      price: 32,
      imageUrl: '/catalog/mega-rare/ticketph.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'La Máquina de escribir',
      description: 'Famosa e imprescindible',
      price: 3000,
      imageUrl: '/catalog/mega-rare/typewriter.png',
      priceHistory: generateMockPriceHistory(1),
    },
  ],
  'Funky Friday': [
    {
      name: 'FF: Acebo Lila',
      description: 'Solo sirve para el G-Earth',
      price: 0.2,
      imageUrl: '/catalog/funky/acebolilaff.png',
      priceHistory: generateMockPriceHistory(1.8),
    },
    {
      name: 'FF: Acebo Verde',
      description: 'Solo sirve para el G-Earth pero menos aún que el lila',
      price: 0.2,
      imageUrl: '/catalog/funky/aceboverdeff.png',
      priceHistory: generateMockPriceHistory(1.8),
    },
    {
      name: 'FF: Silla compacta Sueño Azul',
      description: 'Guay y de plástico',
      price: 0.33,
      imageUrl: '/catalog/funky/aquapodff.png',
      priceHistory: generateMockPriceHistory(1.8),
    },
    {
      name: 'FF: Set Bonsais',
      description: 'Árbol diminuto',
      price: 0.5,
      imageUrl: '/catalog/funky/bonsaiff.png',
      priceHistory: generateMockPriceHistory(1.8),
    },
    {
      name: 'FF: Máquina de Habbo Cola',
      description: 'No tiene descripción in-game',
      price: 1,
      imageUrl: '/catalog/funky/colazero.png',
      priceHistory: generateMockPriceHistory(1.8),
    },
    {
      name: 'FF: Set Felpudos',
      description: 'Guay y de plástico',
      price: 4,
      imageUrl: '/catalog/funky/felpuff1.png',
      priceHistory: generateMockPriceHistory(1.8),
    },
    {
      name: 'FF: Set Luz Bouncer',
      description: 'Por las 2 putas semanas sin dormir',
      price: 4,
      imageUrl: '/catalog/funky/ffbbtrofy.png',
      priceHistory: generateMockPriceHistory(1.8),
    },
    {
      name: 'FF: Set El Británico',
      description: 'Viaja con estilo',
      price: 0.75,
      imageUrl: '/catalog/funky/portsfunky.png',
      priceHistory: generateMockPriceHistory(1.8),
    },
  ],
  HC: [
    {
      name: 'La Cafetera',
      description: '¿Solo o con leche?',
      price: 0.5,
      imageUrl: '/catalog/hc/cafetera.png',
      priceHistory: generateMockPriceHistory(1.8),
    },
    {
      name: 'El Super Dado',
      description: 'Busca tu número',
      price: 2.5,
      imageUrl: '/catalog/hc/dadohc.png',
      priceHistory: generateMockPriceHistory(2.1),
    },
    {
      name: 'Imperiales',
      description: 'Viaja al estiro imperial',
      price: 0.6,
      imageUrl: '/catalog/hc/imperiales.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'El Jacuzzy',
      description: '¡Todos a remojo!',
      price: 0.25,
      imageUrl: '/catalog/hc/jacuzzy.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Majestic Chair',
      description: 'Descanso Real',
      price: 2,
      imageUrl: '/catalog/hc/majestic.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Nordic Table',
      description: 'Perfecta para banquetes',
      price: 0.2,
      imageUrl: '/catalog/hc/nordica.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Lampara HC',
      description: '¡Iluminado!',
      price: 0.5,
      imageUrl: '/catalog/hc/oil.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Set HC Azul',
      description: 'Nadie quiere esta mierda',
      price: 0.15,
      imageUrl: '/catalog/hc/sethcazul.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Study desk',
      description: '¡Para la mejor escuela!',
      price: 0.5,
      imageUrl: '/catalog/hc/study.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'Sofá Trono HC',
      description: 'Buah, ¡esto sí que es cómodo!',
      price: 3.5,
      imageUrl: '/catalog/hc/trono.png',
      priceHistory: generateMockPriceHistory(1),
    },
    {
      name: 'El Club Sofá',
      description: 'Posaderas VIP',
      price: 1,
      imageUrl: '/catalog/hc/vip.png',
      priceHistory: generateMockPriceHistory(1),
    },
  ],
};
