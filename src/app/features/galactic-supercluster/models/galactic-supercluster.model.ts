export interface GalacticSuperCluster {
  id: number;
  name: string;
  description: string | null;
}

export type GalacticSuperClusterRequest =
  Omit<GalacticSuperCluster, 'id'>;