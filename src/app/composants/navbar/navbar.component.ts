import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService: any;
  router: any;






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
