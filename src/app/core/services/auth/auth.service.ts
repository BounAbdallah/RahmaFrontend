import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { apiUrl } from '../../apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = apiUrl;
  private authSubject = new BehaviorSubject<string | null>(this.getToken());

  constructor(private http: HttpClient) {}

  // Enregistrement utilisateur
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(catchError(this.handleError));
  }

  // Enregistrement client
  registerClient(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/client`, userData).pipe(catchError(this.handleError));
  }


  registerGp(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/gp`, userData).pipe(catchError(this.handleError));
  }
  // Enregistrement livreur
  registerLivreur(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/livreur`, userData).pipe(catchError(this.handleError));
  }



    registerChauffeur(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/chauffeur`, userData).pipe(catchError(this.handleError));
  }

  // Connexion
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        this.storeToken(response.access_token);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  // Déconnexion
// Déconnexion
logout(): Observable<any> {
  const token = this.getToken();
  if (!token) {
    return throwError(() => new Error('No token available for logout.'));
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.apiUrl}/logout`, { headers }).pipe(
    map(() => {
      this.clearSession(); // Supprimez le token après déconnexion
      return { message: 'Déconnexion réussie' };
    }),
    catchError(this.handleError)
  );
}



  // Obtenir les détails de l'utilisateur
  getUserDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, { headers: this.createAuthorizationHeader() }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.refreshToken().pipe(switchMap(() => this.getUserDetails()));
        }
        return throwError(() => error);
      })
    );
  }

  // Rafraîchir le token
  refreshToken(): Observable<string> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token available for refresh.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/refresh`, {}, { headers }).pipe(
      map((response: any) => {
        if (response && response.access_token) {
          this.storeToken(response.access_token);
          return response.access_token;
        } else {
          throw new Error('No token returned during refresh.');
        }
      }),
      catchError(this.handleError)
    );
  }

  // Récupérer les headers d'authentification
  private createAuthorizationHeader(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Stocker le token
  private storeToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('auth_token', token);
      this.authSubject.next(token);
    } else {
      console.warn('localStorage is not available.');
    }
  }


  // Obtenir le token
  private getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('auth_token');
    }
    return null; // Retourne null si localStorage n'est pas disponible
  }



  // Supprimer le token
  private clearSession(): void {
    localStorage.removeItem('auth_token');
    this.authSubject.next(null);
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur :', error);
    return throwError(() => new Error('Erreur lors de l\'opération d\'authentification'));
  }
}
