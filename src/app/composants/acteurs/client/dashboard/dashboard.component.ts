import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilService } from '../../../../core/services/profil.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ColisComponent } from '../../../colis/colis/colis.component';
import { AnnonceGPComponent } from '../annonce-gp/annonce-gp.component';
import { ProfilComponent } from '../profil/profil.component';
import { NotificationsComponent } from "../../notifications/notifications.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, ProfilComponent, ColisComponent, AnnonceGPComponent, NotificationsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profilForm: FormGroup;
  userProfile: any;
  notifications: string[] = []; // Array to store notifications
  activities: any[] = []; // Array to store activities
  authService: any;
  router: any;

  constructor(
    private profilService: ProfilService,
    private notificationService: NotificationService,
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
      password_confirmation: [''], // Password confirmation field
      photo_profil: [''],
    });
  }

  ngOnInit(): void {
    this.getProfil();
    // this.getNotifications(); // Fetch notifications on init
    this.loadActivitiesFromLocalStorage(); // Load activities from local storage
  }

  // Retrieve user profile
  getProfil(): void {
    this.profilService.afficherProfil().subscribe((data) => {
      this.userProfile = data;
      if (data.photo_profil) {
        this.userProfile.photo_profil = `http://127.0.0.1:8000/storage/${data.photo_profil}`;
      }
      this.profilForm.patchValue(data); // Use patchValue to simplify
    });
  }

  // // Retrieve notifications
  // getNotifications(): void {
  //   this.notificationService.getNotifications().subscribe(
  //     (data) => {
  //       this.notifications = data; // Assuming the response is an array of notifications
  //     },
  //     (error) => {
  //       console.error('Failed to fetch notifications:', error);
  //     }
  //   );
  // }

  // Load activities from local storage
  loadActivitiesFromLocalStorage(): void {
    const activitiesFromStorage = localStorage.getItem('last_activities');
    this.activities = activitiesFromStorage ? JSON.parse(activitiesFromStorage) : []; // Load activities or initialize empty array
  }

  // Submit profile updates
  onSubmit(): void {
    if (this.profilForm.get('password')?.value !== this.profilForm.get('password_confirmation')?.value) {
      console.error('Passwords do not match');
      this.notifications.push('⚠️ Les mots de passe ne correspondent pas.');
      return;
    }

    const formData = new FormData();
    Object.keys(this.profilForm.controls).forEach((key) => {
      formData.append(key, this.profilForm.get(key)?.value);
    });

    const photoProfil = this.profilForm.get('photo_profil')?.value;
    if (photoProfil) {
      formData.append('photo_profil', photoProfil);
    }

    this.profilService.modifierProfil(formData).subscribe(
      (response) => {
        console.log('Profile updated successfully', response);
        this.notifications.push('✅ Votre profil a été mis à jour avec succès.');
      },
      (error) => {
        console.error('Error updating profile', error);
        this.notifications.push('❌ Erreur lors de la mise à jour du profil.');
      }
    );
  }

  // Handle file input for profile picture
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
        alert('Déconnexion réussie. Vous avez été déconnecté.');
        this.router.navigate(['/connexion']); // Redirige vers la page de connexion
      },
      error: (error: any) => {
        // Gérer les erreurs de déconnexion ici
        console.error('Erreur lors de la déconnexion :', error);
        alert('Une erreur est survenue lors de la déconnexion. Veuillez réessayer.');
      }
    });
  }
}
