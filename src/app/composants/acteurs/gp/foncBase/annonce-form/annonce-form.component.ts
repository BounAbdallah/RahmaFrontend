import { Component } from '@angular/core';
import { Country, State } from 'country-state-city';
import { GpAnnonceService } from '../../../../../core/services/GP/gp-anonce.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-annonce-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './annonce-form.component.html',
  styleUrls: ['./annonce-form.component.css']
})
export class AnnonceFormComponent {

  annonces: any[] = [];
  annonceForm: FormGroup;
  submitted = false;
  errorMessage = '';
  countries: any[] = [];
  regionsProvenance: any[] = [];
  regionsDestination: any[] = [];

  constructor(private formBuilder: FormBuilder, private gpAnnonceService: GpAnnonceService) {
    this.annonceForm = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      date_debut_reception_colis: ['', Validators.required],
      date_fin_reception_colis: ['', Validators.required],
      statut: ['', [Validators.required, Validators.pattern('active|expirée')]],
      poids_kg: ['', [Validators.required, Validators.min(0)]],
      image: [null],
      pays_provenance_voyage: ['', Validators.required],
      region_provenance_voyage: ['',  Validators.required],
      pays_destination_voyage: ['',  Validators.required],
      region_destination_voyage: ['',  Validators.required],
      date_prevue_voyage: ['',  Validators.required],
      heure_prevue_voyage: ['', Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')],
      heure_debut_reception_colis: ['', Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')],
      heure_fin_reception_colis: ['', Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$')],
      prix_par_kg: ['', [Validators.required, Validators.min(0)]],
      condition: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAnnonces();
    this.loadCountries();
  }

  loadAnnonces(): void {
    this.gpAnnonceService.getAnnonces().subscribe(
      (data: any) => {
        this.annonces = data;
      },
      (error: any) => {
        this.errorMessage = 'Erreur lors du chargement des annonces';
        console.error(error);
      }
    );
  }

  loadCountries(): void {
    this.countries = Country.getAllCountries();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.annonceForm.patchValue({ image: file });
    }
  }

  onCountryChange(event: Event, type: 'provenance' | 'destination'): void {
    const target = event.target as HTMLSelectElement;
    const countryName = target.value;
    const states = State.getStatesOfCountry(this.countries.find(country => country.name === countryName)?.isoCode || '');

    if (type === 'provenance') {
      this.regionsProvenance = states;
      this.annonceForm.patchValue({ region_provenance_voyage: '' });
    } else {
      this.regionsDestination = states;
      this.annonceForm.patchValue({ region_destination_voyage: '' });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.annonceForm.invalid) {
      return;
    }

    const formData = new FormData();
    Object.keys(this.annonceForm.controls).forEach(key => {
      if (key === 'image' && this.annonceForm.get(key)?.value) {
        formData.append(key, this.annonceForm.get(key)?.value);
      } else {
        formData.append(key, this.annonceForm.get(key)?.value);
      }
    });

    this.gpAnnonceService.createAnnonce(formData).subscribe(
      (response: any) => {
        console.log('Annonce ajoutée avec succès', response);
        this.annonceForm.reset();
        this.submitted = false;
        this.loadAnnonces();
      },
      (error: any) => {
        this.errorMessage = 'Erreur lors de l\'ajout de l\'annonce';
        console.error(error);
      }
    );
  }
}
