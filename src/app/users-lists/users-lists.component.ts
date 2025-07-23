import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/Services/auth.service';
import { User, UserService } from 'app/Services/UserService';
import { EmailjsService } from 'emailJs/email.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-lists',
  templateUrl: './users-lists.component.html',
  styleUrls: ['./users-lists.component.scss']
})
export class UsersListsComponent implements OnInit {

  users: User[] = [];
  frontUrl=environment.frontUrl;
  constructor(private userService: UserService,private authService: AuthService,private emailjsService: EmailjsService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs', err);
      }
    });
  }

  sendResetPassword(email: string): void {
  Swal.fire({
    icon: 'question',
    title: 'Confirm password reset',
    text: `Send a reset password email to ${email}?`,
    showCancelButton: true,
    confirmButtonText: 'Yes, send it',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
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
              title: 'Reset email sent',
              text: 'The user has received a new password by email.'
            });
          }).catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Email error',
              text: err?.message || 'Failed to send email.'
            });
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Reset error',
            text: err.error?.message || 'Password reset failed.'
          });
        }
      });
    }
  });
}


}
