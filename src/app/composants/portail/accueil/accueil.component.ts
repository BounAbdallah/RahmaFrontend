import { Component } from '@angular/core';
import { TopBareComponent } from '../topBare/topBare.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [TopBareComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

}
