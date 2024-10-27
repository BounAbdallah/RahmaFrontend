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
    const url = `${this.apiUrl}/annonces/${annonceId}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }
// Dans gp-dashboard.service.ts
affichageColisDetails(colisId: number): Observable<any> {
  const url = `${this.apiUrl}/gp/colis/${colisId}`;
  return this.http.get(url).pipe(catchError(this.handleError));
}


affichageReservationDetails(annonceId: number): Observable<any> {
  const url = `${this.apiUrl}/annonces/${annonceId}`;
  return this.http.get(url).pipe(catchError(this.handleError));
}
affichageListeColis(colisId: number): Observable<any> {
  const url = `${this.apiUrl}/gp/${colisId}/colis/`;
  return this.http.get(url).pipe(catchError(this.handleError));
}

  // Ajouter une annonce
  createAnnonce(annonceData: any): Observable<any> {
    const url = `${this.apiUrl}/CreationAnnonces`;
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
  changerStatutReservation(reservationId: number | undefined, status: string): Observable<any> {
    const url = `${this.apiUrl}/reservation/${reservationId}/changer-statut`; // Assurez-vous que reservationId est correctement formaté
    return this.http.patch(url, { status }).pipe( // Changez ici de put à patch
        catchError((error) => {
            console.error('Erreur lors de la mise à jour du statut :', error);
            throw error;
        })
    );
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
