import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionnairesService } from '../../../../core/services/GestionnaireService/gestionnaires.service';

@Component({
  selector: 'app-livreurs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.css'],
})
export class LivreursComponent implements OnInit {
  livreurs: any[] = []; // Liste des livreurs récupérés depuis l'API
  filteredLivreurs: any[] = []; // Liste filtrée
  searchText = '';
  selectedStatut = '';
  selectedDisponibilite = '';

  constructor(private livreursService: GestionnairesService) {}

  ngOnInit(): void {
    this.fetchLivreurs(); // Récupération des livreurs à l'initialisation
  }

  // Récupération des livreurs via le service
  fetchLivreurs(): void {
    this.livreursService.getListeLivreur().subscribe({
      next: (data: any[]) => {
        this.livreurs = data; // Stockage des livreurs récupérés
        this.filterLivreurs(); // Appliquer directement le filtrage après la récupération
      },
      error: (err: any) => console.error('Erreur lors du chargement des livreurs :', err),
    });
  }

  // Filtrage des livreurs en fonction de la recherche et des filtres
  filterLivreurs(): void {
    this.filteredLivreurs = this.livreurs.filter((livreur) => {
      const matchesSearch = livreur.nom.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatut = this.selectedStatut ? livreur.statut === this.selectedStatut : true;
      const matchesDisponibilite = this.selectedDisponibilite
        ? livreur.disponibilite === this.selectedDisponibilite
        : true; // Ajout du filtrage par disponibilité
      return matchesSearch && matchesStatut && matchesDisponibilite;
    });
  }

  // Méthode appelée lors des changements dans les filtres ou la recherche
  onSearchChange(): void {
    this.filterLivreurs();
  }
}
