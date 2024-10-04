export interface Annonce {
  id?: number; //
  titre?: string;
  pays_provenance?: string;
  pays_destination?: string;
  photo_pays_voyage_provenance?: string;
  photo_pays_voyage_destination?: string;
  date_debut_reception_colis?: Date;
  date_fin_reception_colis?: Date;

  image?: string;
  description?: string;
  tarif?: string;
  condition?: string;
  statut?: string;
  poids_kg?: string;

}
