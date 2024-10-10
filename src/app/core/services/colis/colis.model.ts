export interface Colis {
  id?: number; // Utilisé pour les colis existants, peut être optionnel
  titre: string; // Défini comme requis
  poids_kg: number; // Défini comme requis
  image_1?: string; // Optionnel
  image_2?: string; // Optionnel
  adresse_expediteur: string; // Défini comme requis
  adresse_destinataire: string; // Défini comme requis
  contact_destinataire: string; // Défini comme requis
  contact_expediteur: string; // Défini comme requis
  date_envoi: string; // Défini comme requis, vous pouvez utiliser Date si vous gérez les objets Date
  statut: string; // Défini comme requis
  description?: string; // Optionnel
}
