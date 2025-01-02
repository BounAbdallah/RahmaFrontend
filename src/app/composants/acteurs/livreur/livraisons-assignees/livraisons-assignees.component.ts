import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livraisons-assignees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livraisons-assignees.component.html',
  styleUrls: ['./livraisons-assignees.component.css']
})
export class LivraisonsAssigneesComponent {
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
