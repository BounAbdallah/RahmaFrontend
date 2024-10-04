import { GpAnnoncesService } from './../../../../core/services/annonces/gp-annonces.service';
import { Component } from '@angular/core';
import { Annonce } from '../../../../core/services/annonces/annonce.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccueilComponent } from "../../../portail/accueil/accueil.component";
import { TopBareComponent } from "../../../portail/topBare/topBare.component";
import { ProfilService } from '../../../../core/services/profil.service';

@Component({
  selector: 'app-annonce-gp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,  TopBareComponent],
  templateUrl: './annonce-gp.component.html',
  styleUrl: './annonce-gp.component.css'
})
export class AnnonceGPComponent {
 listAnnonceGp: Annonce[] = [];
 userProfile: any;

 constructor(private GpAnnoncesService: GpAnnoncesService,
  private profilService: ProfilService,

 ) {}

  getProfil(): void {
    this.profilService.afficherProfil().subscribe((data) => {
      this.userProfile = data;
      // this.profilForm.patchValue({
      //   prenom: data.prenom,
      //   nom: data.nom,
      //   email: data.email,
      //   telephone: data.telephone,
      //   adress: data.adress,
      //   commune: data.commune,
      // });
    });
  }

 ngOnInit(): void {
  this.getAnnonceGp();
  this.getProfil();

 }
 getAnnonceGp(){
  this.GpAnnoncesService.getGpAnnonce().subscribe((data) => {
    this.listAnnonceGp = data;
  }

  );
 }
}
