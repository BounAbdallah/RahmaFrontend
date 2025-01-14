import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { inject } from '@angular/core'; // Importer inject pour accéder au Router dans une fonction

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let token = null;

  // Vérifier si l'application s'exécute dans un navigateur avant d'accéder à localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem("auth_token");
  }

  // Si pas de token, passer à la requête suivante sans modification
  if (!token) {
    return next(req);
  }

  // Cloner la requête en y ajoutant l'en-tête Authorization avec le Bearer token
  const newRequete = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // Récupérer le Router pour la redirection
  const router = inject(Router);  // Utilisation de `inject` pour obtenir une instance de Router

  return next(newRequete).pipe(
    catchError((error) => {
      // Si l'erreur est liée à un token expiré ou non autorisé (statut 401)
      if (error.status === 401) {
        console.error('Token expiré ou non autorisé');

        // Redirection vers la page de connexion
        router.navigate(['/connexion']);
      }

      // Gérer d'autres erreurs ou laisser le flux d'erreur se propager
      console.error('Erreur interceptée dans authInterceptor : ', error);
      throw error; // Propager l'erreur pour qu'elle soit traitée ailleurs si nécessaire
    })
  );
}
