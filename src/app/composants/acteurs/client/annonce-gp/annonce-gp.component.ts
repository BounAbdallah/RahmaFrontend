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


  constructor(private gpAnnoncesService: GpAnnoncesService, private profilService: ProfilService) {}

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
    this.gpAnnoncesService.getGpAnnonce().subscribe((data) => {
      this.listAnnonceGp = data;
      this.filteredAnnonces = data; // Afficher toutes les annonces initialement
    });
  }


}
