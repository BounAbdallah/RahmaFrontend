import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livreurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.css']
})
export class LivreursComponent {
  livreurs = [
    { nom: 'Oumar Diop', telephone: '+221 77 123 4567', statut: 'Disponible', commandes: 25 },
    { nom: 'Awa Ndiaye', telephone: '+221 76 987 6543', statut: 'Occupé', commandes: 32 },
    { nom: 'Amadou Ba', telephone: '+221 78 555 9876', statut: 'Disponible', commandes: 18 },
    { nom: 'Demba Diouf', telephone: '+221 70 111 2345', statut: 'Disponible', commandes: 12 },
    { nom: 'Cheikh Fall', telephone: '+221 76 543 2109', statut: 'Occupé', commandes: 45 },
  ];

  filteredLivreurs = [...this.livreurs]; // Copie de la liste des livreurs pour filtrage
  searchText = '';
  selectedStatut = '';
  selectedDisponibilite = '';

  // Méthode pour appliquer la recherche et les filtres
  filterLivreurs(): void {
    this.filteredLivreurs = this.livreurs.filter((livreur) => {
      const matchesSearch = livreur.nom.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatut = this.selectedStatut ? livreur.statut === this.selectedStatut : true;
      return matchesSearch && matchesStatut;
    });
  }

  // Méthode appelée lors d'un changement dans les filtres ou la recherche
  onSearchChange(): void {
    this.filterLivreurs();
  }



}
