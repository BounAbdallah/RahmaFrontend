import { Component } from '@angular/core';
import { ColisService } from '../../../../core/services/colis/colis.service';

import { Colis } from '../../../../core/services/colis/colis.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historique-coolis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historique-coolis.component.html',
  styleUrl: './historique-coolis.component.css'
})
export class HistoriqueCoolisComponent {

  listHistorique: Colis[] = [];

  constructor(private colisService: ColisService) {}

  ngOnInit(): void {
    this.getHistorique();
  }

  getHistorique() {
    this.colisService.getHistoriqueColis().subscribe((data) => {
      this.listHistorique = data;
    });
  }



}
