import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from '../../apiUrl'; // Assurez-vous que le chemin vers votre fichier apiUrl est correct

@Injectable({
  providedIn: 'root'
})
export class GpAnnonceService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  // Récupérer toutes les annonces
  getAnnonces(): Observable<any> {
    const url = `${this.apiUrl}/gp-annonces`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

    // Créer une nouvelle annonce
    createAnnonce(annonceData: any): Observable<any> {
      const url = `${this.apiUrl}/gp-annonces`;
      return this.http.post(url, annonceData).pipe(catchError(this.handleError));
    }
  // Restaurer une annonce
  restoreAnnonce(id: number): Observable<any> {
    const url = `${this.apiUrl}/gp-annonces/restore/${id}`;
    return this.http.post(url, {}).pipe(catchError(this.handleError));
  }

  // Récupérer les réservations des utilisateurs
  getReservationsUtilisateurs(): Observable<any> {
    const url = `${this.apiUrl}/gp-annonces/reservations`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  // Récupérer les réservations pour une annonce spécifique
  getReservationsAnnonce(id: number): Observable<any> {
    const url = `${this.apiUrl}/gp-annonces/${id}/reservations`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  // Récupérer les statistiques
  getStatistiques(): Observable<any> {
    const url = `${this.apiUrl}/gp-annonces/statistiques`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  // Récupérer l'évolution des statistiques
  getEvolutionStatistiques(): Observable<any> {
    const url = `${this.apiUrl}/gp-annonces/evolution-statistiques`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  // Récupérer les colis liés aux réservations
  getColisLiensReservations(): Observable<any> {
    const url = `${this.apiUrl}/gp-annonces/colis`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  // Récupérer les utilisateurs avec le plus de réservations
  getUtilisateursPlusReserves(): Observable<any> {
    const url = `${this.apiUrl}/gp-annonces/utilisateurs-plus-reservations`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  // Récupérer tous les utilisateurs ayant réservé
  getTousUtilisateursAyantReserve(): Observable<any> {
    const url = `${this.apiUrl}/gp-annonces/tous-utilisateurs-reserves`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur :', error.message);
    return throwError(() => new Error('Erreur lors de l\'opération sur les annonces'));
  }
}
