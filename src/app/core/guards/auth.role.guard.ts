import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const AuthRoleGuard = (expectedRole: string) => {
  return () => {
    const router = inject(Router);
    let token;
    let user;

    // Récupérer les informations de connexion
    const infos_connexion = JSON.parse(localStorage.getItem('infos_Connexion') || "{}");

    if (infos_connexion) {
      token = infos_connexion.access_token;
      user = infos_connexion.user;
    }

    // Vérification du token et du rôle
    if (!token || user?.role !== expectedRole) {
      router.navigateByUrl("/connexion");
      return false;
    }

    return true;
  };
};
