import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from './../../apiUrl';
import { Reservation } from '../annonces/reservation.model';


@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  // Obtenir la liste des réservations
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${apiUrl}/reservations`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Créer une nouvelle réservation
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${apiUrl}/reservations`, reservation, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Obtenir une réservation par son ID
  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${apiUrl}/reservations/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour une réservation
  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${apiUrl}/reservations/${id}`, reservation, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Supprimer une réservation
  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/reservations/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Récupérer les headers d'authentification
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      console.error('Token non trouvé');
      return new HttpHeaders();
    }
  }

  // Gestion d'erreur
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur :', error);
    return throwError(() => new Error('Erreur lors de l\'opération sur les réservations'));
  }
}
