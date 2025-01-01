import { apiUrl } from './../../apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GestionnairesService {

  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  // Fonction pour récupérer les en-têtes avec le token d'authentification
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      } else {
        console.error('Token non trouvé');
      }
    } else {
      console.error('localStorage is not defined');
    }
    return headers;
  }

  // Fonction pour récupérer les données du tableau de bord
  getDashboardAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getCommandes(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/commandes`, { headers: this.getHeaders() }).pipe(
      map((response) => Array.isArray(response.commandes) ? response.commandes : []), // Extraire le tableau commandes
      catchError(this.handleError)
    );
  }

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
