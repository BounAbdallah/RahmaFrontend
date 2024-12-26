import { apiUrl } from './../../apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Commande } from '../commande.model';

@Injectable({
  providedIn: 'root'
})
export class GestionnairesService {

  private apiUrl = apiUrl;

  constructor(private http: HttpClient ,
  ) { }

  // Fonction pour récupérer les en-têtes avec le token d'authentification
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');

    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      console.error('Token non trouvé');
      return new HttpHeaders();
    }
  }

    // Fonction pour récupérer les données du tableau de bord
    getDashboardAdmin(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/dashboard`, { headers: this.getHeaders() }).pipe(
        catchError(this.handleError)
      );
    }

  // getCommandes(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/commandes`, { headers: this.getHeaders() }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // getCommandes(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/commandes`).pipe(
  //     catchError((error) => {
  //       console.error('Erreur lors de la récupération des commandes :', error);
  //       return throwError(() => new Error('Erreur lors de la récupération des commandes.'));
  //     })
  //   );
  // }
  getCommandes(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajouter le token si nécessaire
    });
    return this.http.get<any>(`${this.apiUrl}/commandes`, { headers });
  }

  // getCommandes(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/commandes`).pipe(
  //     catchError((error) => {
  //       console.error('Erreur lors de la récupération des commandes :', error);
  //       return throwError(() => new Error('Erreur lors de la récupération des commandes.'));
  //     })
  //   );
  // }
  

  // getCommandes(): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/commandes`, { headers: this.getHeaders() }).pipe(
  //     catchError((error) => {
  //       console.error('Erreur lors de la récupération des commandes:', error);
  //       return throwError(() => new Error('Erreur de serveur.'));
  //     })
  //   );
  // }

    // Gestion des erreurs
    private handleError(error: HttpErrorResponse) {
      console.error('Une erreur s\'est produite:', error);
      if (error.status === 401) {
        return throwError(() => new Error('Non authentifié, veuillez vérifier vos identifiants.'));
      } else {
        return throwError(() => new Error('Une erreur s\'est produite, veuillez réessayer plus tard.'));
      }
    }
}
