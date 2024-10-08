import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from '../../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class GpDashboardService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  affichageStatistiques(): Observable<any> {
    const url = `${this.apiUrl}/gp/statistiques`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  affichageAnnonces(): Observable<any> {
    const url = `${this.apiUrl}/gp/mes-annonces`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  affichageReservations(): Observable<any> {
    const url = `${this.apiUrl}/gp/mes-reservations`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  affichageColisPourAnnonce(annonceId: number): Observable<any> {
    const url = `${this.apiUrl}/gp/colis/annonce/${annonceId}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  // Ajouter une annonce
  createAnnonce(annonceData: any): Observable<any> {
    const url = `${this.apiUrl}/gp/annonces`;
    return this.http.post(url, annonceData).pipe(catchError(this.handleError));
  }

  // Mettre à jour une annonce
  updateAnnonce(annonceId: number, annonceData: any): Observable<any> {
    const url = `${this.apiUrl}/gp/annonces/${annonceId}`;
    return this.http.put(url, annonceData).pipe(catchError(this.handleError));
  }

  // Archiver une annonce
  archiveAnnonce(annonceId: number): Observable<any> {
    const url = `${this.apiUrl}/gp/annonces/${annonceId}/archive`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  // Supprimer une annonce
  deleteAnnonce(annonceId: number): Observable<any> {
    const url = `${this.apiUrl}/gp/annonces/${annonceId}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur :', error.message);
    return throwError(() => new Error('Erreur lors de l\'opération sur le tableau de bord'));
  }
}
