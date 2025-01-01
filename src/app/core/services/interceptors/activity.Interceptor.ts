import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const storageKey = 'activities';
const maxActivities = 100;

export const activityInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  recordActivity('API call');
  return next(req); // Utiliser correctement HttpHandlerFn
};

function recordActivity(action: string): void {
  if (typeof localStorage !== 'undefined') {
    const activities = getActivities();
    activities.push({ action, timestamp: new Date().toISOString() });

    // Limiter le nombre d'activités stockées
    if (activities.length > maxActivities) {
      activities.shift();
    }

    localStorage.setItem(storageKey, JSON.stringify(activities));
  } else {
    console.error('localStorage is not defined');
  }
}

function getActivities(): any[] {
  if (typeof localStorage !== 'undefined') {
    const activities = localStorage.getItem(storageKey);
    return activities ? JSON.parse(activities) : [];
  } else {
    console.error('localStorage is not defined');
    return [];
  }
}
