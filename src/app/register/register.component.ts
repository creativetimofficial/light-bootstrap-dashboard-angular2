import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  signUpName: string = '';
  signUpEmail: string = '';
  
  signInEmail: string = '';
  signInPassword: string = '';
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('auth-box');

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    }
  }

  onSignUp(): void {
    const data = {
      nom: this.signUpName,
      email: this.signUpEmail,
      role:0
    };

    this.authService.signUp(data).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          text: 'Un mail contenant le mot de passe sera envoyé.'
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Un compte avec cet email existe déjà.'
        });
        console.error(err);
      }
    });
  }

 onSignIn() {
  const data = {
    email: this.signInEmail,
    password: this.signInPassword
  };

  this.authService.signIn(data).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      localStorage.setItem('name', res.nom);

      Swal.fire({
        icon: 'success',
        title: 'Connexion réussie',
        text: `Bienvenue ${res.nom} !`,
        confirmButtonText: 'Continuer'
      }).then((result) => {
        if (result.isConfirmed) {
          if (res.role === 'Client') {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/admin']);
          }
        }
      });
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Échec de la connexion',
        text: 'Email ou mot de passe incorrect.'
      });
      console.error(err);
    }
  });
}



}
