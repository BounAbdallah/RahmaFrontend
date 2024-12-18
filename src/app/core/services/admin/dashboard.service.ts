import { apiUrl } from './../../apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardAdminService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) { }

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

  // Création d'un utilisateur
  createUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, userData, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Mise à jour d'un utilisateur
  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, userData, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Suppression d'un utilisateur
  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Archivage d'un utilisateur
  archiveUser(userId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/users/${userId}/archive`, {}, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Désarchivage d'un utilisateur
  unarchiveUser(userId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/users/${userId}/unarchive`, {}, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Création d'un tarif
  createTarif(tarifData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tarifs`, tarifData, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Mise à jour d'un tarif
  updateTarif(tarifId: number, tarifData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/tarifs/${tarifId}`, tarifData, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Suppression d'un tarif
  deleteTarif(tarifId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tarifs/${tarifId}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

    // Bascule entre 'actif' et 'archivé'
    toggleEtat(id: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/users/${id}/toggle-etat`, {}, { headers: this.getHeaders() }).pipe(
        catchError(this.handleError)
      );
    }
  
    // Réactiver un utilisateur archivé
    desarchiverUser(id: number): Observable<any> {
      return this.http.put(`${this.apiUrl}/users/${id}/activer`, {}, { headers: this.getHeaders() }).pipe(
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
