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
  'Mega Rares': [],
  'Funky Friday': [],
  'HC Rares': [],
};
