export interface Annonce {
  [x: string]: string | number | Date | undefined; // Autoriser undefined dans les types d'index
  id: number;
  titre: string; // Required
  pays_provenance: string; // Required
  pays_destination: string; // Required
  date_debut_reception_colis: Date; // Required
  date_fin_reception_colis: Date; // Required
  description: string; // Required
  condition: string; // Required
  statut: 'active' | 'expirée'; // Required
  poids_kg: number; // Required and should be numeric
  pays_provenance_voyage?: string; // Nullable
  region_provenance_voyage?: string; // Nullable
  pays_destination_voyage?: string; // Nullable
  region_destination_voyage?: string; // Nullable
  date_prevue_voyage?: Date; // Nullable
  heure_prevue_voyage?: string; // Nullable
  heure_debut_reception_colis?: string; // Nullable
  heure_fin_reception_colis?: string; // Nullable
  prix_par_kg: number; // Required and should be numeric
  available_weight:number;
}
