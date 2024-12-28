import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trajets-avenir',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trajets-avenir.component.html',
  styleUrls: ['./trajets-avenir.component.css']
})
export class TrajetsAVenirComponent {
  // Propriétés pour les filtres
  selectedDate: string = '';
  selectedRegion: string = '';
  selectedStatus: string = '';

  // Liste des trajets
  trajets = [
    { id: 1, date: '2024-12-25 14:00', depart: 'Dakar', arrivee: 'AIBD', client: 'Mamadou Ndiaye', statut: 'Confirmé' },
    { id: 2, date: '2024-12-26 09:00', depart: 'Mbour', arrivee: 'Dakar', client: 'Awa Diop', statut: 'En attente' },
    { id: 3, date: '2024-12-27 08:30', depart: 'Thiès', arrivee: 'Saint-Louis', client: 'Ibrahima Sow', statut: 'Confirmé' },
    { id: 4, date: '2024-12-28 15:00', depart: 'Dakar', arrivee: 'Kaolack', client: 'Mariama Faye', statut: 'En attente' },
    { id: 5, date: '2024-12-29 10:45', depart: 'Ziguinchor', arrivee: 'Dakar', client: 'Ousmane Diallo', statut: 'Confirmé' },
    { id: 6, date: '2024-12-30 17:30', depart: 'Saint-Louis', arrivee: 'Touba', client: 'Fatoumata Ba', statut: 'En attente' }
  ];


  // Trajets filtrés
  filteredTrajets = [...this.trajets];

  // Fonction pour appliquer les filtres
  applyFilters() {
    const dateFilter = this.selectedDate;
    const regionFilter = this.selectedRegion;
    const statusFilter = this.selectedStatus;

    // Filtrer les trajets en fonction des critères sélectionnés
    this.filteredTrajets = this.trajets.filter(trajet => {
      // Filtre par date
      let matchDate = true;
      if (dateFilter) {
        const today = new Date();
        const trajetDate = new Date(trajet.date);
        switch (dateFilter) {
          case 'Aujourd\'hui':
            matchDate = trajetDate.toDateString() === today.toDateString();
            break;
          case 'Cette semaine':
            const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            const endOfWeek = new Date(today.setDate(today.getDate() + 6));
            matchDate = trajetDate >= startOfWeek && trajetDate <= endOfWeek;
            break;
          case 'Ce mois-ci':
            matchDate = trajetDate.getMonth() === today.getMonth() && trajetDate.getFullYear() === today.getFullYear();
            break;
        }
      }

      // Filtre par région
      const matchRegion = regionFilter ? trajet.depart.includes(regionFilter) : true;

      // Filtre par statut
      const matchStatus = statusFilter ? trajet.statut.includes(statusFilter) : true;

      return matchDate && matchRegion && matchStatus;
    });
  }
}
