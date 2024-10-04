import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get(url);
  }

  // Modifier le profil de l'utilisateur
  modifierProfil(profilData: any): Observable<any> {
    const url = `${this.apiUrl}/profil/modifier`;

    // Faire la requête HTTP POST avec les données de profil
    return this.http.post(url, profilData);
  }
}
