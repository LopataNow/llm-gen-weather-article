export interface Region {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export const REGIONS: Record<string, Region> = {
  slovensko: { id: 'slovensko', name: 'Slovensko', lat: 48.73, lon: 19.15 }, // Banská Bystrica proxy centre
  zapad: { id: 'zapad', name: 'Západ (Bratislava)', lat: 48.14, lon: 17.1 },
  sever: { id: 'sever', name: 'Sever (Žilina)', lat: 49.22, lon: 18.74 },
  vychod: { id: 'vychod', name: 'Východ (Košice)', lat: 48.71, lon: 21.25 },
};
