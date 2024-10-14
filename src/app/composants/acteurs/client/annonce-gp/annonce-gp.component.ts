import { GpAnnoncesService } from './../../../../core/services/annonces/gp-annonces.service';
import { Component } from '@angular/core';
import { Annonce } from '../../../../core/services/annonces/annonce.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfilService } from '../../../../core/services/profil.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-annonce-gp',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './annonce-gp.component.html',
  styleUrls: ['./annonce-gp.component.css'] // Corrected from styleUrl to styleUrls
})
export class AnnonceGPComponent {
  listAnnonceGp: Annonce[] = [];
  userProfile: any;
  detailsAnnonceGp: any;
  searchCountry: string = '';
searchDate: string = '';
pays_provenance?: string;  // Utilisation de '?' pour indiquer que c'est optionnel
pays_destination?: string;  // Utilisation de '?' pour indiquer que c'est optionnel
date_disponibilite?: string;

  constructor(private GpAnnoncesService: GpAnnoncesService, private profilService: ProfilService) {}

  ngOnInit(): void {
    this.getAnnonceGp();
    this.getProfil();
  }

  getProfil(): void {
    this.profilService.afficherProfil().subscribe((data) => {
      this.userProfile = data;
    });
  }

  getAnnonceGp(): void {
    this.GpAnnoncesService.getGpAnnonce().subscribe((data) => {
      this.listAnnonceGp = data;
    });
  }

  // This method can be triggered when an announcement is clicked
  viewAnnonceDetails(id: number): void {
    this.GpAnnoncesService.getAnnonceById(id).subscribe((data) => {
      this.detailsAnnonceGp = data;

    });
  }
  onSearch() {
    const filteredAnnonces = this.listAnnonceGp.filter(annonce => {
      const isCountryMatch =
        (annonce.pays_provenance && annonce.pays_provenance.toLowerCase().includes(this.searchCountry.toLowerCase())) ||
        (annonce.pays_destination && annonce.pays_destination.toLowerCase().includes(this.searchCountry.toLowerCase()));

      const isDateMatch =
        annonce.date_fin_reception_colis &&
        new Date(annonce.date_fin_reception_colis).toDateString() === new Date(this.searchDate).toDateString();

      return isCountryMatch && isDateMatch;
    });

    this.listAnnonceGp = filteredAnnonces;
  }
}
