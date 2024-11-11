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
  regionsProvenance: any[] = [];
  regionsDestination: any[] = [];
  currentStep: number = 1;

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
    this.countries = Country.getAllCountries().map(country => ({
      name: country.name,
      isoCode: country.isoCode
    }));
    if (this.data?.annonce) {
      this.annonceForm.patchValue(this.data.annonce);
      this.setDateFields();
    }
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.annonceForm.get(['titre', 'date_debut_reception_colis', 'date_fin_reception_colis', 'condition', 'poids_kg', 'prix_par_kg'])?.valid) {
      this.currentStep = 2;
    }
  }

  previousStep(): void {
    if (this.currentStep === 2) {
      this.currentStep = 1;
    }
  }

  onSubmitAnnonce(): void {
    if (this.annonceForm.valid) {
      const formattedAnnonce = {
        ...this.annonceForm.value,
        heure_prevue_voyage: this.formatTime(this.annonceForm.value.heure_prevue_voyage),
        heure_debut_reception_colis: this.formatTime(this.annonceForm.value.heure_debut_reception_colis),
        heure_fin_reception_colis: this.formatTime(this.annonceForm.value.heure_fin_reception_colis),
      };

      this.annonceGpService.createAnnonce(formattedAnnonce).subscribe(
        (response: any) => {
          console.log('Annonce créée avec succès:', response);
        },
        (error: any) => {
          console.error('Erreur lors de la création de l\'annonce:', error);
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }

  private formatTime(time: string): string {
    const date = new Date(`1970-01-01T${time}`);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  }

  setDateFields(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.annonceForm.get('date_debut_reception_colis')?.setValue(currentDate);
    this.annonceForm.get('date_fin_reception_colis')?.setValue(currentDate);
  }

  onCountryChange(isProvenance: boolean): void {
    const selectedCountry = isProvenance
      ? this.annonceForm.get('pays_provenance_voyage')?.value
      : this.annonceForm.get('pays_destination_voyage')?.value;

    if (selectedCountry) {
      const country = this.countries.find(c => c.name === selectedCountry);
      if (country) {
        const regions = State.getStatesOfCountry(country.isoCode).map(state => state.name);
        if (isProvenance) {
          this.regionsProvenance = regions;
        } else {
          this.regionsDestination = regions;
        }
      }
    }
  }

  close(): void {
    console.log('Modal fermée');
  }
}
