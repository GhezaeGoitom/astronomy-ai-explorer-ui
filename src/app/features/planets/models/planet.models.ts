export interface Planet {
  id: number;
  name: string;
  objectSize: number | null;
  objectMass: number | null;
  score: number | null;
  description: string | null;
  solarSystemId: number | null;
  discoverId: number;
}

export interface PlanetRequest {
  name: string;
  objectSize: number | null;
  objectMass: number | null;
  score: number | null;
  description: string | null;
  solarSystemId: number | null;
  discoverId: number | null;
}