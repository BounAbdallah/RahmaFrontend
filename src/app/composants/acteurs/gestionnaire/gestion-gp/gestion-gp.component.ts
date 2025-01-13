import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GestionnairesService } from '../../../../core/services/GestionnaireService/gestionnaires.service';

@Component({
  selector: 'app-gestion-gp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-gp.component.html',
  styleUrls: ['./gestion-gp.component.css']
})
export class GestionGPComponent implements OnInit {
  chauffeur: any[] = []; // Liste des GP (chauffeurs)
  filteredChauffeur: any[] = []; // Liste filtrée
  searchText = ''; // Texte de recherche
  selectedStatut = ''; // Filtrage par statut
  selectedDisponibilite = ''; // Filtrage par disponibilité

  constructor(private chauffeurService: GestionnairesService) {}

  ngOnInit(): void {
    this.fetchChauffeur(); // Récupération des GP
  }

  // Méthode pour récupérer les GP via le service
  fetchChauffeur(): void {
    this.chauffeurService.getListeGP().subscribe({
      next: (data: any[]) => {
        this.chauffeur = data; // Stockage des GP
        this.filteredChauffeur = data; // Initialisation de la liste filtrée
      },
      error: (err: any) => console.error('Erreur lors du chargement des chauffeurs :', err),
    });
  }

  // Méthode pour filtrer les GP selon les critères de recherche
  onSearchChange(): void {
    this.filteredChauffeur = this.chauffeur.filter(gp => {
      const matchesSearch = gp.nom.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesStatut = this.selectedStatut ? gp.statut === this.selectedStatut : true;
      const matchesDisponibilite = this.selectedDisponibilite ? gp.disponibilite === this.selectedDisponibilite : true;
      return matchesSearch && matchesStatut && matchesDisponibilite;
    });
  }
}
