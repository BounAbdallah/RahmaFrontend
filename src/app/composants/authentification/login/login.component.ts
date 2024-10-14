import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  connexion() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          // Afficher une alerte de succès avec SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Connexion réussie',
            text: 'Vous êtes maintenant connecté!',
            timer: 1500,
            showConfirmButton: false
          });

          localStorage.setItem('currentUser', JSON.stringify(response));
          const userRole = response.role;

          // Redirection basée sur le rôle
          if (userRole === 'GP') {
            this.router.navigate(['/DashboardGP']);
          } else if (userRole === 'Client') {
            this.router.navigate(['/DashboardClient']);
          } else {
            this.router.navigate(['/accueil']);
          }
        },
        error: (error) => {
          // Afficher une alerte d'erreur avec SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Email ou mot de passe incorrect',
            confirmButtonText: 'Réessayer'
          });

          console.error('Erreur lors de la connexion', error);
        }
      });
    } else {
      // Alerte si le formulaire est invalide
      Swal.fire({
        icon: 'warning',
        title: 'Formulaire invalide',
        text: 'Veuillez remplir tous les champs correctement.',
        confirmButtonText: 'OK'
      });
    }
  }

  retour(): void {
    this.router.navigate(['/accueil']);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }

  getFieldError(field: string, errorType: string): boolean {
    const control = this.loginForm.get(field);
    return control?.hasError(errorType) && (control?.dirty || control?.touched) || false;
  }
}
