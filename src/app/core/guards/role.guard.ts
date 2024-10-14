import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const expectedRole = next.data['role'];
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const token = localStorage.getItem('auth_token');

    // Vérification de l'existence du token
    if (!token) {
      // Si aucun token, rediriger vers l'accueil
      this.router.navigate(['/connexion']);
      return false;
    }

    // Vérification du rôle de l'utilisateur
    if (!currentUser || currentUser.role !== expectedRole) {
      // Redirection si l'utilisateur n'a pas le rôle attendu
      this.router.navigate(['/accueil']);
      return false;
    }

    // Vérifier si le token est expiré
    if (this.isTokenExpired(token)) {
      // Si le token est expiré, rediriger vers l'accueil
      this.router.navigate(['/connexion']);
      return false;
    }

    return true;
  }

  // Méthode pour vérifier l'expiration du token
  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = payload.exp * 1000; // Convertir en millisecondes
    const currentDate = Date.now();

    return currentDate > expirationDate;
  }
}
