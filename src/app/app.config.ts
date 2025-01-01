import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/services/interceptors/auth.interceptor';
import { activityInterceptor } from './core/services/interceptors/activity.Interceptor'; // Notez la casse correcte
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig } from '@angular/core'; // Importer ApplicationConfig

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, activityInterceptor])
    ),
    provideAnimationsAsync(),
    provideClientHydration(),
  ]
};
