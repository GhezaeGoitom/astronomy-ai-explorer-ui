export interface Universe {
  id: number;
  name: string;
  description: string | null;
  coordinate: string | null;
}

export type UniverseRequest = Omit<Universe, 'id'>;