import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GestionnairesService } from '../../../../core/services/GestionnaireService/gestionnaires.service';

@Component({
  selector: 'app-chauffeur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.css'],
})
export class ChauffeurComponent implements OnInit {
  chauffeurs: any[] = []; // Liste des livreurs récupérés depuis l'API
  filteredChauffeur: any[] = []; // Liste filtrée
  searchText = '';
  selectedStatut = '';
  selectedDisponibilite = '';

  constructor(private livreursService: GestionnairesService) {}

  ngOnInit(): void {
    this.fetchChauffeur(); // Récupération des livreurs à l'initialisation
  }

  // Récupération des livreurs via le service
  fetchChauffeur(): void {
    this.livreursService.getListeChauffur().subscribe({
      next: (data: any[]) => {
        this.chauffeurs = data; // Stockage des livreurs récupérés
        this.filterChauffeurs(); // Appliquer directement le filtrage après la récupération
      },
      error: (err: any) => console.error('Erreur lors du chargement des livreurs :', err),
    });
  }

  // Filtrage des livreurs en fonction de la recherche et des filtres
  filterChauffeurs(): void {
    this.filteredChauffeur = this.chauffeurs.filter((chauffeur) => {
      const matchesSearch = chauffeur.nom.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatut = this.selectedStatut ? chauffeur.statut === this.selectedStatut : true;
      const matchesDisponibilite = this.selectedDisponibilite
        ? chauffeur.disponibilite === this.selectedDisponibilite
        : true; // Ajout du filtrage par disponibilité
      return matchesSearch && matchesStatut && matchesDisponibilite;
    });
  }

  // Méthode appelée lors des changements dans les filtres ou la recherche
  onSearchChange(): void {
    this.filterChauffeurs();
  }
}
