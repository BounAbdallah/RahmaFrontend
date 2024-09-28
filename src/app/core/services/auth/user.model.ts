export class User {
  id?: number;
  prenom?: string;
  nom?: string;
  email?: string;
  telephone?: string;
  password?: string;
  statut?: string;
  adress?: string; // Optionnel
  cni?: string; // Optionnel
  permis_conduire?: string; // Optionnel
  pays_de_voyage?: string; // Optionnel
  region_de_voyage?: string; // Optionnel
  passeport?: string; // Optionnel
  date_de_naissance?: Date; // Optionnel
  prix_kg?: number; // Optionnel, avec précision pour le décimal
  commune?: string; // Optionnel
  email_verified_at?: Date; // Optionnel
  remember_token?: string; // Optionnel
  created_at?: Date; // Optionnel
  updated_at?: Date; // Optionnel
  deleted_at?: Date; // Optionnel
}
