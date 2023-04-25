import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  username: string;

  constructor(public authService: AuthService, public router: Router) {}

  async login(username: string, password: string) {
    try {
      await this.authService.login(username, password).toPromise();
      // navegar al componente de la página principal si la respuesta es exitosa
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error(error);
    }
  }

  register() {
    const user = { email: this.email, password: this.password };
    this.router.navigateByUrl('/register');
  }

  ngOnInit() {
  }

}
