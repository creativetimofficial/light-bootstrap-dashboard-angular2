import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm , Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-usuariosEditar',
  templateUrl: './usuariosEditar.component.html',
  styleUrls: ['./usuariosEditar.component.css']
})
export class UsuariosEditarComponent implements OnInit {

  usuariosEditarForm: FormGroup;
  httpOptions: any;
  token: any;
  response: any;
  datosCargados: boolean;
  
  roles = {
    9: { name: "ROLE_ADMIN", detalle: "ROLE_ADMIN" },
    10: { name: "ROLE_USUARIO", detalle: "ROLE_USUARIO" },
    11: { name: "ROLE_DIOSESANO", detalle: "ROLE_DIOSESANO" },
    12: { name: "ROLE_REGIONAL", detalle: "ROLE_REGIONAL" },
    13: { name: "ROLE_ZONAL", detalle: "ROLE_ZONAL" },
    14: { name: "ROLE_LATAM", detalle: "ROLE_LATAM" },
  }
  constructor(private http: HttpClient, private router: Router,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.usuariosEditarForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      document: [null, Validators.required],
      state: [null, Validators.required],
      rol: [null, Validators.required],
    });
  }
  ngOnInit() {
   
    let token = localStorage.getItem('jwt');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
    const elementId = this.activatedRoute.snapshot.paramMap.get('id');
    const currentDate = new Date();

    this.obtenerDatosUsuario(elementId).subscribe(data => {
      // Asignar los datos del elemento al formulario utilizando setValue()
   
      // let fecha = new Date(data.response.creationDate);
      // let fechaFormateada = fecha.toISOString().substring(0, 10);
      // this.usuariosEditarForm.controls['creationDate'].setValue(fechaFormateada);
      this.usuariosEditarForm.controls['name'].setValue(data.response[0].name);
      this.usuariosEditarForm.controls['lastname'].setValue(data.response[0].lastname);
      this.usuariosEditarForm.controls['username'].setValue(data.response[0].username);
      this.usuariosEditarForm.controls['password'].setValue(data.response[0].password);
      this.usuariosEditarForm.controls['document'].setValue(data.response[0].document);
      this.usuariosEditarForm.controls['state'].setValue(data.response.state);
      this.usuariosEditarForm.controls['rol'].setValue(data.response[0].roles[0].id);
      // this.usuariosEditarForm.controls['selectedRole'].setValue(selectedRole);

      console.log(data.response);

      this.datosCargados = true;
      console.log(this.datosCargados);
    });
  }
  obtenerDatosUsuario(id: string): Observable<any> {
    const params = { id: id };
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/user/getUsuarios?id=${params.id}`;
    const response = this.http.get(url, this.httpOptions); 
    console.log(response);
    return response  
  }
  editarUsuario() {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');

    // const name = (<HTMLInputElement>document.getElementById('name')).value;
    // const lastname = (<HTMLInputElement>document.getElementById('lastname')).value;
    // const username = (<HTMLInputElement>document.getElementById('username')).value;
    // const password = (<HTMLInputElement>document.getElementById('password')).value;
    // const data = { document: (<HTMLInputElement>document.getElementById('document')).value };
    // const state = true;
    // const rolSelecionado = (<HTMLInputElement>document.getElementById('rol')).value;
    // const selectedRole = this.roles[rolSelecionado];

    // const jsonUsuario = {
    //   id,
    //   name,
    //   lastname,
    //   username,
    //   password,
    //   data,
    //   state,
    //   roles: [{
    //     id: rolSelecionado,
    //     name: selectedRole.name,
    //     detalle: selectedRole.detalle
    //   }]
    // };

    // const nuevoUsuario = JSON.stringify(jsonUsuario); // Convertir el objeto en una cadena JSON
    // console.log(nuevoUsuario);

    // if (this.httpOptions) {
    //   this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/user/updateUsuario', nuevoUsuario, this.httpOptions)
    //   .subscribe(data => {
    //     console.log(data);
    //     alert('Usuario Actualizado exitosamente');
    //     this.router.navigate(['/usuariosGrid']);
    //   }, error => {
    //     console.error(error);
    //   });
    // } else {
    //   alert('httpOptions no está definido, intente iniciar sesion nuevamente');
    //   console.log('httpOptions no está definido');
    // }
  }
}
