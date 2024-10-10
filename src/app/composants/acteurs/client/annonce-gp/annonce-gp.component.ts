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
}
