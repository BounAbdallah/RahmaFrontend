import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from '../apiUrl';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = apiUrl;

  constructor(private http: HttpClient) {}

  // Récupérer toutes les notifications
  getNotifications(): Observable<any> {
    const url = `${this.apiUrl}/notifications`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  // Marquer une notification comme lue
  markAsRead(notificationId: string): Observable<any> {
    const url = `${this.apiUrl}/notifications/${notificationId}/mark-as-read`;
    return this.http.post(url, {}).pipe(catchError(this.handleError));
  }

  // Marquer toutes les notifications comme lues
  markAllAsRead(): Observable<any> {
    const url = `${this.apiUrl}/notifications/mark-all-as-read`;
    return this.http.post(url, {}).pipe(catchError(this.handleError));
  }

  // Gestion d'erreur
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erreur :', error);
    return throwError(() => new Error('Erreur lors de la récupération des notifications'));
  }
}
