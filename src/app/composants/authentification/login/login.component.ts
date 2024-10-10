import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';

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
          // Stocker les informations de l'utilisateur dans le stockage local
          localStorage.setItem('currentUser', JSON.stringify(response));

          // Débogage: Afficher la réponse de l'API
          console.log('Réponse de l\'API:', response);

          // Récupérer le rôle de l'utilisateur
          const userRole = response.role; // Assurez-vous que le rôle est bien renvoyé dans la réponse

          // Redirection basée sur le rôle
          if (userRole === 'GP') {
            this.router.navigate(['/reservationGp']);
          } else if (userRole === 'Client') {
            this.router.navigate(['/ProfilClient']);
          } else {
            // Rediriger vers une page par défaut ou une page d'erreur si le rôle n'est pas reconnu
            this.router.navigate(['/accueil']);
          }
        },
        error: (error) => {
          // Gérer l'erreur
          console.error('Erreur lors de la connexion', error);
        }
      });
    }
  }

  // Méthode pour revenir en arrière
  retour(): void {
    this.router.navigate(['/accueil']);
  }
}
