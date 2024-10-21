export interface Colis {
  id?: number; // Utilisé pour les colis existants, optionnel
  titre: string; // Requis
  poids_kg: number; // Requis, aligné avec decimal(8,2)
  image_1?: string; // Optionnel
  image_2?: string; // Optionnel
  image_3?: string; // Optionnel, ajouté pour correspondre à la base
  adresse_expediteur: string; // Requis
  adresse_destinataire: string; // Requis
  contact_destinataire: string; // Requis
  contact_expediteur: string; // Requis
  date_envoi: string; // Requis, peut être géré comme Date si nécessaire
  date_reception?: string; // Optionnel, ajouté pour correspondre à la base
  statut: 'en transit' | 'livré' | 'en attente' | 'retourné'; // Requis, correspond aux valeurs de l'énumération
  etat: 'archivé' | 'desarchivé' | 'en cours'; // Requis, avec 'en cours' par défaut
  description?: string; // Optionnel
  user_id: number; // Requis, associé à l'utilisateur
  created_at?: string; // Optionnel, timestamp
  updated_at?: string; // Optionnel, timestamp
  deleted_at?: string; // Optionnel, timestamp pour la suppression logique
  reservation_id?: number; // Optionnel, associé à une réservation
}
