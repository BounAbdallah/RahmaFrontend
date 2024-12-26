export class Commande {
  id?: number; // Facultatif, car il sera généré automatiquement par le backend
  titre?: string;
  status?: 'en_attente' | 'approuver' | 'desaprouver' | 'attribuer_au_livreur' | 'en_route' | 'livrer';
  type_livraison?: 'Livraison standard' | 'Livraison express' | 'Livraison domicile' | 'Livraison sur_demande';
  jour_livraison?: string; // Format attendu : YYYY-MM-DD (nullable)
  heure_livraison?: string; // Format attendu : HH:mm:ss (nullable)
  adresse_destinateur?: string;
  description?: string;
  message?: string;
  user_id?: number; // Correspond au champ `foreignIdFor(User::class)`
  colis_id?: number; // Correspond au champ `foreignIdFor(Colis::class)`
  created_at?: string; // Format attendu : ISO date string (ex: YYYY-MM-DDTHH:mm:ssZ)
  updated_at?: string; // Format attendu : ISO date string (ex: YYYY-MM-DDTHH:mm:ssZ)
}
