import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  // Afficher le profil de l'utilisateur connecté
  afficherProfil(): Observable<any> {
    const url = `${this.apiUrl}/profil`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  // Modifier le profil de l'utilisateur
  modifierProfil(profilData: any): Observable<any> {
    const url = `${this.apiUrl}/profil/modifier`;
    return this.http.post(url, profilData).pipe(catchError(this.handleError));
  }

  // Gestion d'erreur
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur :', error);
    return throwError(() => new Error('Erreur lors de l\'opération sur le profil'));
  }
}
