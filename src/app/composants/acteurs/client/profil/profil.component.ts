import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProfilService } from '../../../../core/services/profil.service';
import { TopBareComponent } from "../../../portail/topBare/topBare.component";

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, TopBareComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  profilForm: FormGroup;
  userProfile: any;

  constructor(
    private profilService: ProfilService,
    private formBuilder: FormBuilder
  ) {
    this.profilForm = this.formBuilder.group({
      prenom: [''],
      nom: [''],
      email: [''],
      telephone: [''],
      address: [''],
      commune: [''],
      password: [''],
      password_confirmation: [''], // Ajout du champ de confirmation
      photo_profil: [''],
    });
  }

  ngOnInit(): void {
    this.getProfil();
  }

  // Récupérer les informations du profil
  getProfil(): void {
    this.profilService.afficherProfil().subscribe((data) => {
      this.userProfile = data;
      this.profilForm.patchValue({
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        telephone: data.telephone,
        adress: data.adress,
        commune: data.commune,
      });
    });
  }

  // Envoyer les modifications du profil
  onSubmit(): void {
    // Validation des mots de passe
    if (this.profilForm.get('password')?.value !== this.profilForm.get('password_confirmation')?.value) {
      console.error('Les mots de passe ne correspondent pas');
      return;
    }

    const formData = new FormData();

    // Ajouter les valeurs du formulaire à formData
    Object.keys(this.profilForm.controls).forEach((key) => {
      formData.append(key, this.profilForm.get(key)?.value);
    });

    // Si un fichier d'image a été sélectionné
    const photoProfil = this.profilForm.get('photo_profil')?.value;
    if (photoProfil) {
      formData.append('photo_profil', photoProfil);
    }

    this.profilService.modifierProfil(formData).subscribe(
      (response) => {
        console.log('Profil mis à jour avec succès', response);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du profil', error);
      }
    );
  }

  // Gestion de l'image de profil à partir d'un input type file
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profilForm.patchValue({
        photo_profil: file,
      });
    }
  }
}
