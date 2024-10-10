

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

    if (!currentUser || currentUser.role !== expectedRole) {
      // Redirection si l'utilisateur n'a pas le rôle attendu
      this.router.navigate(['/accueil']);
      return false;
    }
    return true;
  }
}
