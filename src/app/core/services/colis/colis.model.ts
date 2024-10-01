export interface Colis {
  id?: number; // Utilisé pour les colis existants
  titre?: string;
  poids_kg?: number;
  adresse_expediteur?: string;
  adresse_destinataire?: string;
  contact_destinataire?: string;
  contact_expediteur?: string;
  date_envoi?: string; // ou Date si vous gérez les objets Date
  statut?: string;
  description?: string; // optionnel
}
