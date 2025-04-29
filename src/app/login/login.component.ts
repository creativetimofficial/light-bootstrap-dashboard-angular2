// login.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  credentials = {
    login: '',
    motDePasse: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    localStorage.clear()
  }
  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/formation-liste']);
      },
      error: (err) => {
        if (err.status === 500 || err.status === 0) {
          // Erreur serveur ou backend non joignable
          Swal.fire({
            icon: 'error',
            title: 'Erreur serveur',
            text: 'Veuillez réessayer plus tard.',
            confirmButtonColor: '#d82c2c',
            confirmButtonText:"réessayer"
          });
        } else {
          // Erreur d’identifiants (ex : exception Runtime côté backend)
          Swal.fire({
            icon: 'warning',
            title: 'Identifiants invalides',
            text: "Nom d'utilisateur ou mot de passe incorrect.",
            confirmButtonColor: '#d82c2c',
            confirmButtonText:"réessayer",
            
           
          });
        }
      },
    });
  }}