export interface Supernova {
  id: number;
  name: string;
  brightness: number | null;
  universeId: number;
  discoverId: number;
  description: string | null;
}

export type SupernovaRequest = Omit<Supernova, 'id'>;