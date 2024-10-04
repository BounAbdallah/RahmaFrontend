import { apiUrl } from './../../apiUrl';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Annonce } from './annonce.model';

@Injectable({
  providedIn: 'root'
})
export class GpAnnoncesService {

  private apiUrl = apiUrl;
  constructor(private http: HttpClient) { }

  // obtenir la liste d'annonce des GP disponible

  getGpAnnonce(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.apiUrl}/GpDisponible`, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      console.error('Token non trouvé');
      return new HttpHeaders();
    }
  }
}
