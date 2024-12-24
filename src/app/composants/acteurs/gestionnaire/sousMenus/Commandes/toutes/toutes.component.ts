import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-toutes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toutes.component.html',
  styleUrls: ['./toutes.component.css']
})
export class ToutesComponent {
  // Données fictives des commandes
  commandes = [
    { id: 1, client: 'Client 1', livreur: 'Livreur 1', statut: 'En attente', date: '2024-12-21', zone: 'dakar' },
    { id: 2, client: 'Client 2', livreur: 'Livreur 2', statut: 'Terminée', date: '2024-12-15', zone: 'thies' },
    { id: 3, client: 'Client 3', livreur: 'Livreur 3', statut: 'En cours', date: '2024-12-18', zone: 'diourbel' },
    { id: 4, client: 'Client 4', livreur: 'Livreur 4', statut: 'En attente', date: '2024-12-20', zone: 'dakar' },
  ];

  filteredCommandes = [...this.commandes];

  // Méthodes pour ajouter, modifier, annuler ou assigner un livreur
  ajouterCommande() {
    console.log('Ajouter une commande');
  }

  modifierCommande(id: number) {
    console.log('Modifier la commande avec l\'ID:', id);
  }

  annulerCommande(id: number) {
    console.log('Annuler la commande avec l\'ID:', id);
  }

  assignerLivreur(id: number) {
    console.log('Assigner un livreur à la commande avec l\'ID:', id);
  }

  // Méthode pour la recherche par texte
  rechercheCommandes(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredCommandes = this.commandes.filter(commande =>
      commande.client.toLowerCase().includes(searchTerm) ||
      commande.livreur.toLowerCase().includes(searchTerm)
    );
  }

  // Filtrer par statut
  filtrerStatut(event: any) {
    const statut = event.target.value;
    this.filteredCommandes = this.commandes.filter(commande =>
      statut ? commande.statut.toLowerCase() === statut.toLowerCase() : true
    );
  }

  // Filtrer par date
  filtrerDate(event: any) {
    const dateOption = event.target.value;
    const today = new Date();
    let startDate: Date;

    switch (dateOption) {
      case '1': // Aujourd'hui
        startDate = today;
        break;
      case '7': // Cette semaine
        startDate = new Date(today.setDate(today.getDate() - 7));
        break;
      case '30': // Ce mois
        startDate = new Date(today.setMonth(today.getMonth() - 1));
        break;
      default:
        this.filteredCommandes = [...this.commandes];
        return;
    }

    this.filteredCommandes = this.commandes.filter(commande => {
      const commandeDate = new Date(commande.date);
      return commandeDate >= startDate;
    });
  }

  // Filtrer par zone géographique
  filtrerZone(event: any) {
    const zone = event.target.value;
    this.filteredCommandes = this.commandes.filter(commande =>
      zone ? commande.zone.toLowerCase() === zone.toLowerCase() : true
    );
  }
}
