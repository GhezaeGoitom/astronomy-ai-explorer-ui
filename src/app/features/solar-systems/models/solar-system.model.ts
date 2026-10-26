export interface SolarSystem {
  id: number;
  name: string;
  galaxyId: number | null;
  description: string | null;
  discoverId: number | null;
}

export type SolarSystemRequest = Omit<SolarSystem, 'id'>;