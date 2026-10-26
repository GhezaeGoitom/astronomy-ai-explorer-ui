export interface GalacticCluster {
  id: number;
  name: string;
  galacticSuperClusterId: number | null;
  description: string | null;
}

export type GalacticClusterRequest = Omit<GalacticCluster, 'id'>;