import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Country, State } from 'country-state-city';
import { GpDashboardService } from '../../../../core/services/GP/gp-dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-annonce-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './annonce-form-modal.component.html',
  styleUrls: ['./annonce-form-modal.component.css']
})
export class AnnonceFormModalComponent implements OnInit {
  @Input() data: any; // Remplacez par le type approprié
  annonceForm: FormGroup;
  countries: any[] = [];
  regionsProvenance: any[] = []; // Régions pour le pays de provenance
  regionsDestination: any[] = []; // Régions pour le pays de destination
  currentStep: number = 1; // Étape actuelle du formulaire

  constructor(private fb: FormBuilder, private annonceGpService: GpDashboardService) {
    this.annonceForm = this.fb.group({
      titre: ['', Validators.required],
      date_debut_reception_colis: ['', Validators.required],
      date_fin_reception_colis: ['', Validators.required],
      description: [''],
      condition: ['', Validators.required],
      statut: ['active', Validators.required],
      poids_kg: ['', [Validators.required, Validators.min(0)]],
      prix_par_kg: ['', [Validators.required, Validators.min(0)]],
      pays_provenance_voyage: ['', Validators.required],
      region_provenance_voyage: [''],
      pays_destination_voyage: ['', Validators.required],
      region_destination_voyage: [''],
      date_prevue_voyage: ['', Validators.required],
      heure_prevue_voyage: ['', Validators.required],
      heure_debut_reception_colis: ['', Validators.required],
      heure_fin_reception_colis: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.countries = Country.getAllCountries();
    if (this.data?.annonce) {
      this.annonceForm.patchValue(this.data.annonce);
      this.setDateFields();
    }
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.annonceForm.get(['titre', 'date_debut_reception_colis', 'date_fin_reception_colis', 'condition', 'poids_kg', 'prix_par_kg'])?.valid) {
      this.currentStep = 2; // Passer à la deuxième étape
    }
  }

  previousStep(): void {
    if (this.currentStep === 2) {
      this.currentStep = 1; // Retourner à la première étape
    }
  }

  onSubmitAnnonce(): void {
    if (this.annonceForm.valid) {
      // Formater les heures avant de les envoyer à l'API
      const formattedAnnonce = {
        ...this.annonceForm.value,
        heure_prevue_voyage: this.formatTime(this.annonceForm.value.heure_prevue_voyage),
        heure_debut_reception_colis: this.formatTime(this.annonceForm.value.heure_debut_reception_colis),
        heure_fin_reception_colis: this.formatTime(this.annonceForm.value.heure_fin_reception_colis),
      };

      this.annonceGpService.createAnnonce(formattedAnnonce).subscribe(
        (response: any) => {
          console.log('Annonce créée avec succès:', response);
          // Logique pour fermer la modal ou rediriger l'utilisateur
        },
        (error: any) => {
          console.error('Erreur lors de la création de l\'annonce:', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }

  private formatTime(time: string): string {
    const date = new Date(`1970-01-01T${time}`);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}:00`;
  }

  setDateFields(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    const dateDebut = this.annonceForm.get('date_debut_reception_colis');
    const dateFin = this.annonceForm.get('date_fin_reception_colis');

    if (!dateDebut?.value) {
      dateDebut?.setValue(currentDate);
    }
    if (!dateFin?.value) {
      dateFin?.setValue(currentDate);
    }
  }

  onCountryChange(isProvenance: boolean): void {
    const countryCode = isProvenance
      ? this.annonceForm.get('pays_provenance_voyage')?.value
      : this.annonceForm.get('pays_destination_voyage')?.value;

    if (countryCode) {
      const regions = State.getStatesOfCountry(countryCode);
      if (isProvenance) {
        this.regionsProvenance = regions; // Mettre à jour les régions de provenance
      } else {
        this.regionsDestination = regions; // Mettre à jour les régions de destination
      }
    }
  }

  close(): void {
    console.log('Modal fermée');
  }
}
