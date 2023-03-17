import { Component, OnInit } from '@angular/core';
import { UsersService } from "../user/user.service";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(public userService: UsersService, public router: Router, public http: HttpClient) {}

  login() {
    debugger
    const url = 'https://encuentro-matrimonial-backend.herokuapp.com/login';
    const body = {
      username: 'admin',
      password: 'admin'
    };
    return this.http.post(url, body);
  }

  // login() {
  //   const user = { email: this.email, password: this.password };
  //   this.userService.login(user).subscribe(
  //     data => {
  //       //this.userService.setToken(data.token);
  //       this.router.navigateByUrl('/');
  //     },
  //     error => {
  //       console.log(error);
  //     });
  // }
  register() {
    const user = { email: this.email, password: this.password };
    this.router.navigateByUrl('/register');
  }
  ngOnInit() {
  }

}
