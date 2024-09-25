import { Routes } from '@angular/router';
import { AccueilComponent } from './composants/portail/accueil/accueil.component';

export const routes: Routes = [





  // Route principale pour le portail et les autre pages lier au portail.


  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    component: AccueilComponent
  }

];
