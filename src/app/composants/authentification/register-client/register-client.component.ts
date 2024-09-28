import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-register-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css'] // Assurez-vous que c'est styleUrls et non styleUrl
})
export class RegisterClientComponent implements OnInit {
  registerForm: FormGroup;
  currentStep: number = 1;
  municipalites: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      telephone: ['', Validators.required],
      adress: ['', Validators.required],
      commune: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Votre logique d'initialisation
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formData = new FormData();

      Object.keys(this.registerForm.controls).forEach(key => {
        formData.append(key, this.registerForm.get(key)?.value);
      });

      this.authService.registerClient(formData).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          Swal.fire({
            title: 'Inscription réussie !',
            text: 'Vous pouvez maintenant vous connecter.',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/login']);
          });
        },
        error: (error) => {
          console.error('Erreur lors de l\'inscription', error);
          Swal.fire({
            title: 'Erreur',
            text: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.',
            icon: 'error',
            timer: 3000,
            showConfirmButton: false
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Champs obligatoires',
        text: 'Veuillez remplir tous les champs obligatoires.',
        icon: 'warning',
        timer: 3000,
        showConfirmButton: false
      });
    }
  }
}
