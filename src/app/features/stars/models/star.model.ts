export interface Star {
  id: number;
  name: string;
  objectSize: number | null;
  objectMass: number | null;
  description: string | null;
  solarSystemId: number | null;
  discoverId: number | null;
}

export type StarRequest = Omit<Star, 'id'>;