import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/Services/auth.service';
import { EmailjsService } from 'emailJs/email.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  signUpName: string = '';
  signUpEmail: string = '';
  frontUrl=environment.frontUrl;
  signInEmail: string = '';
  signInPassword: string = '';
  constructor(private authService: AuthService,private router: Router,private emailjsService: EmailjsService,private cookieService: CookieService) { }

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
          next: (response) => {
          const params = {
            email: data.email,
            name: data.nom, 
            password: response.mdp,
            loginLink: this.frontUrl+'/auth'
          };

          this.emailjsService.sendPasswordEmail(params);

          Swal.fire({
            icon: 'success',
            title: 'Registration successful',
            text: 'An email containing your password will be sent.'
          });
        },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An account with this email already exists.'
        });
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
      this.cookieService.set('token', res.token);
      this.cookieService.set('role', res.role);
      this.cookieService.set('name', res.nom);
      this.cookieService.set('userId', res.userId);
      const redirectUrl = this.cookieService.get('redirectAfterLogin');
      this.cookieService.delete('redirectAfterLogin'); 
      Swal.fire({
        icon: 'success',
        title: 'Login successful',
        text: `Welcome  ${res.nom} !`,
        confirmButtonText: 'Continue'
      }).then((result) => {
        if (result.isConfirmed) {
          if (res.role === 'Client') {
            if (redirectUrl && (redirectUrl.includes('formulaireiotit') || redirectUrl.includes('formulairefranchise'))) {
              this.router.navigateByUrl(redirectUrl);
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            this.router.navigate(['/admin']);
          }
        }
      });
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: 'Incorrect email or password.'
      });
    }
  });
}

showForgetForm = false;
forgetEmail: string = '';
handleForgetPassword(email: string): void {
  if (!email) {
    Swal.fire({
      icon: 'warning',
      title: 'Email required',
      text: 'Please enter your email address.',
    });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid email',
      text: 'Please enter a valid email address.',
    });
    return;
  }
  this.authService.forgetPassword({ email }).subscribe({
    next: (res) => {
      const params = {
        email: email,
        password: res.mdp, 
        loginLink: this.frontUrl + '/auth'
      };

     this.emailjsService.sendPasswordEmail(params).then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Password reset email sent',
              text: 'Please check your inbox for your new password.',
            });
            this.showForgetForm = false;
            this.forgetEmail = '';
          }).catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Email error',
              text: err?.message || 'Failed to send email. Try again later.',
            });
          });
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Reset error',
        text: err.error?.message || 'Failed to reset password.',
      });
    }
  });
}


}
