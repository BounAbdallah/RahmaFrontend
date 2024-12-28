
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historique-trajets',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './historique-trajets.component.html',
  styleUrl: './historique-trajets.component.css'
})
export class HistoriqueTrajetsComponent {

  // Propriétés pour les filtres
  searchQuery: string = '';
  selectedPeriod: string = '';
  selectedStatus: string = '';

  // Liste des trajets
  trajets = [
    { date: '2024-12-25 14:00', depart: 'Dakar', arrivee: 'Aéroport', client: 'Monsieur Samba Diouf', montantGagne: 10000, statut: 'Livré' },
    { date: '2024-12-26 09:00', depart: 'Mbour', arrivee: 'Dakar', client: 'Madame Aissatou Ndiaye', montantGagne: 8000, statut: 'Annulé' },
    { date: '2024-12-27 08:30', depart: 'Thiès', arrivee: 'Saint-Louis', client: 'Monsieur Cheikh Fall', montantGagne: 12000, statut: 'En retard' },
    { date: '2024-12-28 15:00', depart: 'Dakar', arrivee: 'Mbour', client: 'Madame Khady Seck', montantGagne: 15000, statut: 'Livré' },
    { date: '2024-12-29 10:45', depart: 'Dakar', arrivee: 'Thiès', client: 'Monsieur Ibrahime Sow', montantGagne: 7000, statut: 'Livré' },
    { date: '2024-12-30 17:30', depart: 'Saint-Louis', arrivee: 'Dakar', client: 'Madame Adama Diagne', montantGagne: 9000, statut: 'Annulé' }
  ];


  // Trajets filtrés
  filteredTrajets = [...this.trajets];

  // Fonction pour appliquer les filtres
  applyFilters() {
    let periodFilter = this.selectedPeriod;
    let statusFilter = this.selectedStatus;
    let searchFilter = this.searchQuery.toLowerCase();

    this.filteredTrajets = this.trajets.filter(trajet => {
      let matchPeriod = true;
      let matchStatus = true;
      let matchSearch = true;

      // Filtrer par période
      if (periodFilter) {
        const today = new Date();
        const trajetDate = new Date(trajet.date);
        switch (periodFilter) {
          case 'Aujourd\'hui':
            matchPeriod = trajetDate.toDateString() === today.toDateString();
            break;
          case 'Cette semaine':
            const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            const endOfWeek = new Date(today.setDate(today.getDate() + 6));
            matchPeriod = trajetDate >= startOfWeek && trajetDate <= endOfWeek;
            break;
          case 'Ce mois-ci':
            matchPeriod = trajetDate.getMonth() === today.getMonth() && trajetDate.getFullYear() === today.getFullYear();
            break;
        }
      }

      // Filtrer par statut
      if (statusFilter) {
        matchStatus = trajet.statut.toLowerCase().includes(statusFilter.toLowerCase());
      }

      // Filtrer par recherche (date, client, destination)
      if (searchFilter) {
        matchSearch = trajet.date.toLowerCase().includes(searchFilter) ||
                      trajet.client.toLowerCase().includes(searchFilter) ||
                      trajet.arrivee.toLowerCase().includes(searchFilter);
      }

      return matchPeriod && matchStatus && matchSearch;
    });
  }
}
