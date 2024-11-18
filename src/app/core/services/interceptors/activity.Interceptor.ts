import { HttpInterceptorFn } from '@angular/common/http';

const storageKey = 'userActivities';
const maxActivities = 10;

export const ActivityInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor déclenché pour la requête :', req.url);

  // Formuler un message personnalisé
  const actionMessage = generateActionMessage(req.method, req.url);
  recordActivity(actionMessage);

  return next(req);
};

// Génère un message personnalisé basé sur la méthode et l'URL de la requête
function generateActionMessage(method: string, url: string): string {
  const baseUrl = 'http://127.0.0.1:8000/api/';

  const messagesMap: { [key: string]: string } = {
    'profil/modifier': 'Vous avez modifié votre profil',
    'profil': 'Vous avez consulté votre profil',
    'GpDisponible': 'Vous avez vérifié les GP disponibles',
    'notifications': 'Vous avez consulté vos notifications',
  };

  const endpoint = url.replace(baseUrl, ''); // Extraire le chemin après le domaine

  const message = messagesMap[endpoint];
  const date = new Date();
  const formattedDate = date.toLocaleString();

  return message
    ? `${formattedDate} - ${message}`
    : `${formattedDate} - Requête vers ${method} ${url}`;
}

// Enregistre l'activité dans localStorage
function recordActivity(action: string) {
  const activities = getActivities();
  activities.push({ action, timestamp: new Date().toISOString() });

  // Limiter le nombre d'activités stockées
  if (activities.length > maxActivities) {
    activities.shift();
  }

  localStorage.setItem(storageKey, JSON.stringify(activities));
  console.log('Activités sauvegardées :', activities);
}

// Récupère les activités depuis localStorage
function getActivities(): any[] {
  const activities = localStorage.getItem(storageKey);
  return activities ? JSON.parse(activities) : [];
}
