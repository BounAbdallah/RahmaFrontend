import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccueilComponent } from "./composants/portail/accueil/accueil.component";
import { TopBareComponent } from './composants/portail/topBare/topBare.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './composants/authentification/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AccueilComponent, TopBareComponent,FormsModule, LoginComponent, HttpClientModule, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RahmaFrontend';
}
