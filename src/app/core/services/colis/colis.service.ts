import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from './../../apiUrl';
import { Colis } from './colis.model';

@Injectable({
  providedIn: 'root',
})
export class ColisService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  // Obtenir la liste des colis
  getColis(): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${apiUrl}/colis`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Créer un nouveau colis
  createColis(colis: Colis): Observable<Colis> {
    return this.http.post<Colis>(`${apiUrl}/colis`, colis, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  createColisClient(formData: FormData): Observable<any> {
    return this.http.post<any>(`${apiUrl}/colis`, formData, {
      headers: this.getHeaders(),
    }).pipe(
      catchError(this.handleError)
    );
  }


  getHistoriqueColis(): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${apiUrl}/historique/colis`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Obtenir un colis par son ID
  getColisById(id: number): Observable<Colis> {
    return this.http.get<Colis>(`${this.apiUrl}/colis/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour un colis
  updateColis(id: number, colis: Colis): Observable<Colis> {
    return this.http.put<Colis>(`${apiUrl}/colis/${id}`, colis, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Supprimer un colis
  deleteColis(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/colis/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Supprimer définitivement un colis
  forceDeleteColis(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/colis/force-delete/${id}`, { headers: this.getHeaders() })
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
    return throwError(() => new Error('Erreur lors de l\'opération sur les colis'));
  }
}
