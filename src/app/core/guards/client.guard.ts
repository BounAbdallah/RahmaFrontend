import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = localStorage.getItem('auth_token');

    // Vérification du token
    if (!token) {
      this.router.navigate(['/connexion']);
      return false;
    }

    // Vérification du rôle
    if (!currentUser || currentUser.role !== 'client') {
      this.router.navigate(['/accueil']);
      return false;
    }

    // Vérification de l'expiration du token
    if (this.isTokenExpired(token)) {
      this.router.navigate(['/connexion']);
      return false;
    }

    return true;
  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() > payload.exp * 1000;
  }
}
