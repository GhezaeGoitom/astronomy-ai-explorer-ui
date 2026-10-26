export interface BlackHole {
  id: number;
  name: string;
  objectSize: number | null;
  objectMass: number | null;
  description: string | null;
  galaxyId: number | null;
  discoverId: number | null;
}

export type BlackHoleRequest = Omit<BlackHole, 'id'>;