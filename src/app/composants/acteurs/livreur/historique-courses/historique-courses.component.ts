import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historique-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historique-courses.component.html',
  styleUrls: ['./historique-courses.component.css']
})
export class HistoriqueCoursesComponent {
  livraisons = [
    { id: '#12345', client: 'John Doe', adresse: 'Dakar, Plateau', statut: 'En attente' },
    { id: '#67890', client: 'Jane Smith', adresse: 'Dakar, Almadies', statut: 'En cours' },
    { id: '#54321', client: 'Ali Ndiaye', adresse: 'Thies, Grand Standing', statut: 'Terminée' }
  ];

  filteredLivraisons = [...this.livraisons];
  selectedFilter = '';

  filterLivraisons(statut: string): void {
    this.selectedFilter = statut;
    if (statut) {
      this.filteredLivraisons = this.livraisons.filter(livraison => livraison.statut === statut);
    } else {
      this.filteredLivraisons = [...this.livraisons];
    }
  }
}
