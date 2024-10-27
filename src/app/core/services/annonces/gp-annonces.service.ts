import { apiUrl } from './../../apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Annonce } from './annonce.model';

@Injectable({
  providedIn: 'root'
})
export class GpAnnoncesService {
 

  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  // Obtenir la liste des annonces disponibles
  getGpAnnonce(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiUrl}/GpDisponible`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Obtenir une annonce spécifique par son ID
 getAnnonceById(id: number): Observable<Annonce[]> {
  return this.http.get<Annonce[]>(`${this.apiUrl}/detailsAnnoceGP/${id}`, { headers: this.getHeaders() })
    .pipe(catchError(this.handleError));
}



  // Récupérer les headers avec le token d'authentification
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      console.error('Token non trouvé');
      return new HttpHeaders();
    }
  }


  affichageReservations(): Observable<any> {
    const url = `${this.apiUrl}/gp/mes-reservations`;
    return this.http.get(url).pipe(
      catchError((error: any) => {
        console.error('Erreur dans l\'appel API : ', error);
        throw error;
      })
    );
  }
  affichageColisPourAnnonce(annonceId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detailsColisPourAnnonce/${annonceId}`)
      .pipe(catchError(this.handleError));
  }
  // Gestion d'erreur
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Une erreur est survenue : ', error);
    return throwError(() => new Error('Erreur lors de la récupération des données'));
  }
}
