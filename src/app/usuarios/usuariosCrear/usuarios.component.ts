import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  httpOptions: any;
  token: any;

  roles = {
    9: { name: "ROLE_ADMIN", detalle: "ROLE_ADMIN" },
    10: { name: "ROLE_USUARIO", detalle: "ROLE_USUARIO" },
    11: { name: "ROLE_DIOSESANO", detalle: "ROLE_DIOSESANO" },
    12: { name: "ROLE_REGIONAL", detalle: "ROLE_REGIONAL" },
    13: { name: "ROLE_ZONAL", detalle: "ROLE_ZONAL" },
    14: { name: "ROLE_LATAM", detalle: "ROLE_LATAM" },
  }
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    let token = localStorage.getItem('jwt');
    console.log(token);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
  }

  newUsuario() {
    const currentDate = new Date();

    const name = (<HTMLInputElement>document.getElementById('name')).value;
    const lastname = (<HTMLInputElement>document.getElementById('lastname')).value;
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    const doc = (<HTMLInputElement>document.getElementById('document')).value;
    const creationDate = currentDate.toISOString();
    const state = true;
    const rolSelecionado = (<HTMLInputElement>document.getElementById('rol')).value;
    const selectedRole = this.roles[rolSelecionado];

    const jsonUsuario = {
      name,
      lastname,
      username,
      password,
      document: doc,
      creationDate,
      state,
      roles: [{
        id: rolSelecionado,
        name: selectedRole.name,
        detalle: selectedRole.detalle
      }]
    };

    const nuevoUsuario = JSON.stringify(jsonUsuario); // Convertir el objeto en una cadena JSON
    console.log(nuevoUsuario);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/user/createUsuario', nuevoUsuario, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        alert('Usuario creado exitosamente');
        this.router.navigate(['/usuariosGrid']);
      }, error => {
        console.error(error);
      });
    } else {
      alert('httpOptions no está definido, intente iniciar sesion nuevamente');
      console.log('httpOptions no está definido');
    }
  }
}
