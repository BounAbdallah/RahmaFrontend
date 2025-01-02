import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-moto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-moto.component.html',
  styleUrls: ['./gestion-moto.component.css']
})
export class GestionMotoComponent implements OnInit {
  lastMaintenanceDate: Date = new Date('2025-01-01'); // Exemple de dernière date d'entretien
  insuranceExpiryDate: Date = new Date('2025-04-10'); // Exemple de date d'expiration de l'assurance
  nextMaintenanceDate: Date = new Date();
  insuranceRenewalAlert: string = '';
  maintenanceAlert: string = '';

  ngOnInit(): void {
    this.calculateNextMaintenanceDate();
    this.calculateInsuranceRenewalAlert();
    this.calculateMaintenanceAlert();
  }

  calculateNextMaintenanceDate(): void {
    const nextDate = new Date(this.lastMaintenanceDate);
    nextDate.setDate(nextDate.getDate() + 14); // Ajouter 14 jours
    this.nextMaintenanceDate = nextDate;
  }

  calculateInsuranceRenewalAlert(): void {
    const today = new Date();
    const timeDiff = this.insuranceExpiryDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    this.insuranceRenewalAlert = `Renouvellement dans ${daysDiff} jours.`;
  }

  calculateMaintenanceAlert(): void {
    const today = new Date();
    const timeDiff = this.nextMaintenanceDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    this.maintenanceAlert = `Prévu dans ${daysDiff} jours.`;
  }
}
