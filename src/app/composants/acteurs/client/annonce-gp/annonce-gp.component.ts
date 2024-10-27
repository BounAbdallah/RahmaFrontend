import { Component } from '@angular/core';
import { Annonce } from '../../../../core/services/annonces/annonce.model';
import { GpAnnoncesService } from './../../../../core/services/annonces/gp-annonces.service';
import { ProfilService } from '../../../../core/services/profil.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-annonce-gp',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './annonce-gp.component.html',
  styleUrls: ['./annonce-gp.component.css']
})
export class AnnonceGPComponent {
  listAnnonceGp: Annonce[] = [];
  filteredAnnonces: Annonce[] = [];
  userProfile: any;

  searchTerm: string = '';

  constructor(private gpAnnoncesService: GpAnnoncesService, private profilService: ProfilService) {}

  ngOnInit(): void {
    this.getAnnonceGp();
    this.getProfil();
  }

  getProfil(): void {
    this.profilService.afficherProfil().subscribe({
      next: (data) => {
        this.userProfile = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du profil :', err);
      }
    });
  }

  getAnnonceGp(): void {
    this.gpAnnoncesService.getGpAnnonce().subscribe({
      next: (data) => {
        if (data) {
          this.listAnnonceGp = data;
          this.filteredAnnonces = data; // Afficher toutes les annonces initialement
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des annonces :', err);
      }
    });
  }

  // Méthode pour filtrer les annonces
  filterAnnonces(): void {
    const searchTermLower = this.searchTerm.toLowerCase();

    this.filteredAnnonces = this.listAnnonceGp.filter((annonce) => {
      return (
        (annonce.pays_provenance_voyage && annonce.pays_provenance_voyage.toLowerCase().includes(searchTermLower)) ||
        (annonce.region_provenance_voyage && annonce.region_provenance_voyage.toLowerCase().includes(searchTermLower)) ||
        (annonce.pays_destination_voyage && annonce.pays_destination_voyage.toLowerCase().includes(searchTermLower)) ||
        (annonce.region_destination_voyage && annonce.region_destination_voyage.toLowerCase().includes(searchTermLower)) ||
        (annonce.date_prevue_voyage && new Date(annonce.date_prevue_voyage).toLocaleDateString().includes(searchTermLower)) ||
        (annonce.heure_prevue_voyage && annonce.heure_prevue_voyage.includes(searchTermLower)) ||
        (annonce.heure_debut_reception_colis && annonce.heure_debut_reception_colis.includes(searchTermLower)) ||
        (annonce.heure_fin_reception_colis && annonce.heure_fin_reception_colis.includes(searchTermLower)) ||
        (annonce.prix_par_kg && annonce.prix_par_kg.toString().includes(searchTermLower))
      );
    });
  }
}
