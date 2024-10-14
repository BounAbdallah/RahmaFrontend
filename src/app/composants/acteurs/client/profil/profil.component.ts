import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProfilService } from '../../../../core/services/profil.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../../../core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,  NavbarComponent],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  profilForm: FormGroup;
  userProfile: any;

  constructor(
    private profilService: ProfilService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,

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

      if (data.photo_profil) {
        this.userProfile.photo_profil = `http://127.0.0.1:8000/storage/${data.photo_profil}`;
      }

      this.profilForm.patchValue({
        prenom: data.prenom,
        nom: data.nom,
        email: data.email,
        telephone: data.telephone,
        address: data.adress,
        commune: data.commune,
        photo_profil: data.photo_profil // Cette valeur est déjà mise à jour
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
  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        // Déconnexion réussie
        Swal.fire({
          title: 'Déconnexion réussie',
          text: 'Vous avez été déconnecté.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          // Redirige vers la page de connexion
          this.router.navigate(['/connexion']);
        });
      },
      error: (error: any) => {
        console.error('Erreur lors de la déconnexion', error);
        Swal.fire({
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la déconnexion. Veuillez réessayer.',
          icon: 'error',
          timer: 3000,
          showConfirmButton: false
        });
      }
    });
  }
}
