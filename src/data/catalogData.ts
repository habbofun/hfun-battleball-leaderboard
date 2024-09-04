import { CatalogData } from '@/types/habbo';

export async function fetchCatalogData(): Promise<CatalogData> {
  // Fetch data from database here
  // For now, we'll just return the static data
  return catalogData;
}

// Keep the static data for fallback or initial loading
export const catalogData: CatalogData = {
  Rares: [
    {
      name: 'Almohadón Púrpura',
      description: 'Enorme, suave y acolchado',
      price: 1,
      itemImageUrl: '/catalog/rares/almolila.png',
    },
    {
      name: 'Aloe Vera',
      description: 'Viva el verde',
      price: 1,
      itemImageUrl: '/catalog/rares/aloe.png',
    },
    {
      name: 'El Césped',
      description: 'Para pisar descalzos',
      price: 1,
      itemImageUrl: '/catalog/rares/cespedvivo.png',
    },
    {
      name: 'La Fontana Mágica',
      description: '¡Todo un Oasis!',
      price: 1,
      itemImageUrl: '/catalog/rares/fontyazul.png',
    },
    {
      name: 'Máquina de Habbo Cola',
      description: '¡Una refrescante y chispeante bebida pixelada!',
      price: 1.5,
      itemImageUrl: '/catalog/rares/habbocola.png',
    },
    {
      name: 'Holoboy',
      description: 'Tantas vueltas',
      price: 1,
      itemImageUrl: '/catalog/rares/holoboy.png',
    },
    {
      name: 'Holo Ángel',
      description: 'Gira, amor, gira',
      price: 2,
      itemImageUrl: '/catalog/rares/hologirl.png',
    },
    {
      name: 'El cascarón del Dragón',
      description: 'Una leyenda se está gestando',
      price: 1.5,
      itemImageUrl: '/catalog/rares/huevodragon.png',
    },
    {
      name: 'La Humareda Roja',
      description: 'Nubes bajo tu techo',
      price: 0.5,
      itemImageUrl: '/catalog/rares/humaredaroja.png',
    },
    {
      name: 'Puerta Láser Roja',
      description: 'Rayo energético ¡Da calambre!',
      price: 1,
      itemImageUrl: '/catalog/rares/laserrojo.png',
    },
    {
      name: 'Luciérnaga Amarilla',
      description: '¡Una luz espectacular!',
      price: 2,
      itemImageUrl: '/catalog/rares/lucyamarilla.png',
    },
  ],
  'Mega Rares': [
    {
      name: 'Dragón de Fuego Bronce',
      description: 'Llamaradas Inquietantes',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/broncedragon.png',
    },
    {
      name: 'Habbo Trofeo Bronce',
      description: 'Habbo Trofeo Bronce',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/bronceht.png',
    },
    {
      name: 'Dragón de Fuego Oro',
      description: 'Llamaradas Inquietantes',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/orodragon.png',
    },
    {
      name: 'Dragón de Fuego Plata',
      description: 'Llamaradas Inquietantes',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/platadragon.png',
    },
    {
      name: 'Ticket',
      description: 'Ticket para Juegos',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/ticketph.png',
    },
    {
      name: 'La Máquina de escribir',
      description: 'Famosa e imprescindible',
      price: 2,
      itemImageUrl: '/catalog/mega-rare/typewriter.png',
    },
  ],
  'Funky Friday': [],
  'HC Rares': [
    {
      name: 'La Cafetera',
      description: '¿Solo o con leche?',
      price: 2,
      itemImageUrl: '/catalog/hc/cafetera.png',
    },
    {
      name: 'El Super Dado',
      description: 'Busca tu número',
      price: 2,
      itemImageUrl: '/catalog/hc/dadohc.png',
    },
    {
      name: 'Imperiales',
      description: 'Viaja al estiro imperial',
      price: 2,
      itemImageUrl: '/catalog/hc/imperiales.png',
    },
    {
      name: 'El Jacuzzy',
      description: '¡Todos a remojo!',
      price: 2,
      itemImageUrl: '/catalog/hc/jacuzzy.png',
    },
    {
      name: 'Majestic Chair',
      description: 'Descanso Real',
      price: 2,
      itemImageUrl: '/catalog/hc/majestic.png',
    },
    {
      name: 'Nordic Table',
      description: 'Perfecta para banquetes',
      price: 2,
      itemImageUrl: '/catalog/hc/nordica.png',
    },
    {
      name: 'Lampara HC',
      description: '¡Iluminado!',
      price: 2,
      itemImageUrl: '/catalog/hc/oil.png',
    },
    {
      name: 'Set HC Azul',
      description: 'Nadie quiere esta mierda',
      price: 2,
      itemImageUrl: '/catalog/hc/sethcazul.png',
    },
    {
      name: 'Study desk',
      description: '¡Para la mejor escuela!',
      price: 2,
      itemImageUrl: '/catalog/hc/study.png',
    },
    {
      name: 'Sofá Trono HC',
      description: 'Buah, ¡esto sí que es cómodo!',
      price: 2,
      itemImageUrl: '/catalog/hc/trono.png',
    },
    {
      name: 'El Club Sofá',
      description: 'Posaderas VIP',
      price: 2,
      itemImageUrl: '/catalog/hc/vip.png',
    },
  ],
};
