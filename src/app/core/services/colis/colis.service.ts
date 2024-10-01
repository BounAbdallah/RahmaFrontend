import { apiUrl } from './../../apiUrl';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colis } from './colis.model'; // Importez votre modèle Colis

@Injectable({
  providedIn: 'root',
})
export class ColisService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  // Obtenir la liste des colis
  getColis(): Observable<Colis[]> {
    return this.http.get<Colis[]>(`${apiUrl}/colis`, { headers: this.getHeaders() });
  }

  // Créer un nouveau colis
  createColis(colis: Colis): Observable<Colis> {
    return this.http.post<Colis>(`${apiUrl}/colis`, colis, {
      headers: this.getHeaders(),
    });
  }

  // Obtenir les détails d'un colis spécifique
  getColisById(id: number): Observable<Colis> {
    return this.http.get<Colis>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Mettre à jour un colis
  updateColis(id: number, colis: Colis): Observable<Colis> {
    return this.http.put<Colis>(`${apiUrl}/colis/${id}`, colis, {
      headers: this.getHeaders(),
    });
  }

  // Supprimer un colis
  deleteColis(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/colis/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Supprimer définitivement un colis
  forceDeleteColis(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}/colis/force-delete`, {
      headers: this.getHeaders(),
    });
  }

  // Fonction pour obtenir les headers d'authentification
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token'); // Récupérez le token d'authentification
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      console.error('Token non trouvé');
      return new HttpHeaders();
    }
  }
}
