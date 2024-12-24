import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent {


<<<<<<< HEAD


=======
>>>>>>> 4fb5e8a (Ajout de l'interface parametre pour gestionnaire)
  commandes = [
    { id: 1, client: 'Cheikh Ndiaye', livreur: 'Mamadou Sow', statut: 'En attente', zone: 'Zone 1', date: '2024-12-20' },
    { id: 2, client: 'Awa Diop', livreur: 'Moussa Bâ', statut: 'Livrée', zone: 'Zone 2', date: '2024-12-19' },
    { id: 3, client: 'Amadou Thiam', livreur: 'Ousmane Fall', statut: 'Annulée', zone: 'Zone 1', date: '2024-12-18' },
    { id: 4, client: 'Seynabou Gaye', livreur: 'Ibrahima Diagne', statut: 'En cours', zone: 'Zone 3', date: '2024-12-17' },
    { id: 5, client: 'Khadija Ba', livreur: 'Alioune Ndour', statut: 'En attente', zone: 'Zone 2', date: '2024-12-16' },
    { id: 6, client: 'Fatima Sylla', livreur: 'Mbaye Gueye', statut: 'Livrée', zone: 'Zone 1', date: '2024-12-15' },
    { id: 7, client: 'Mame Diarra Faye', livreur: 'Souleymane Dia', statut: 'En cours', zone: 'Zone 3', date: '2024-12-14' },
    { id: 8, client: 'Ibrahima Sarr', livreur: 'Adama Diagne', statut: 'En attente', zone: 'Zone 2', date: '2024-12-13' }
  ];

  filteredCommandes = [...this.commandes];
  currentPage = 1;
  itemsPerPage = 6;

  searchQuery = '';
  selectedStatut = '';
  selectedDate = '';
  selectedZone = '';
  Math = Math;

  filterCommandes() {
    this.filteredCommandes = this.commandes.filter((commande) => {
      return (
        (!this.searchQuery || commande.client.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
        (!this.selectedStatut || commande.statut === this.selectedStatut) &&
        (!this.selectedDate || new Date(commande.date).toISOString().slice(0, 10) === this.selectedDate) &&
        (!this.selectedZone || commande.zone === this.selectedZone)
      );
    });
    this.currentPage = 1; // Reset to first page after filter
  }

  get paginatedCommandes() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCommandes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  getStatusClass(statut: string): string {
    switch (statut) {
      case 'En attente':
        return 'status-pending'; // Définissez ces classes dans le CSS
      case 'Livrée':
        return 'status-delivered';
      case 'Annulée':
        return 'status-canceled';
      case 'En cours':
        return 'status-in-progress';
      default:
        return '';
    }

}
}
