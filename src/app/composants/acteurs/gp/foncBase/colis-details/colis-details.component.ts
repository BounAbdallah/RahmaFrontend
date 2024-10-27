import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-colis-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './colis-details.component.html',
  styleUrl: './colis-details.component.css'
})
export class ColisDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  colisDetails: any;

  close() {
    this.colisDetails = null;
  }
}
