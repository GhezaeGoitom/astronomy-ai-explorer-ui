export interface Galaxy {
  id: number;
  name: string;
  universeId: number | null;
  galacticClusterId: number | null;
  description: string | null;
  discoverId: number | null;
}

export type GalaxyRequest = Omit<Galaxy, 'id'>;