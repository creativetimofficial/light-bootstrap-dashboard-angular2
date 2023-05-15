import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component'; 

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  httpOptions: any;
  token: any;
  ciudades: any[]; // Declarar la propiedad 'ciudades'
  paises: any[]; // Declarar la propiedad 'paises'
  selectedCiudad: string;
  selectedPais: string;

  roles = {
    1: { name: "ROLE_ADMIN", detalle: "ROLE_ADMIN" },
    2: { name: "ROLE_USUARIO", detalle: "ROLE_USUARIO" },
    3: { name: "ROLE_DIOSESANO", detalle: "ROLE_DIOSESANO" },
    4: { name: "ROLE_REGIONAL", detalle: "ROLE_REGIONAL" },
    5: { name: "ROLE_ZONAL", detalle: "ROLE_ZONAL" },
    6: { name: "ROLE_LATAM", detalle: "ROLE_LATAM" },
  }
  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    let token = localStorage.getItem('jwt');
    console.log(token);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
    // Obtener los datos del país
  this.obtenerDatosPais().subscribe((data) => {
    // Obtener la respuesta del JSON
    const response = data.response;
    // Obtener el select del HTML
    const selectPais = document.getElementById('select-pais') as HTMLSelectElement;

    // Crear un option por cada país en la respuesta del JSON
    response.forEach((pais: any) => {
      const option = document.createElement('option');
      option.value = pais.id;
      option.text = pais.name;
      selectPais.appendChild(option);
    });
  });
  }
  openDialog():void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: "¿Estás seguro que la informacion ingresada es correcta?"
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if(res){
        this.newUsuario();
      }
    })
  }
  newUsuario() {
    const currentDate = new Date();

    const name = (<HTMLInputElement>document.getElementById('name')).value;
    const lastname = (<HTMLInputElement>document.getElementById('lastname')).value;
    const username = (<HTMLInputElement>document.getElementById('nombreUsuario')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    const doc = (<HTMLInputElement>document.getElementById('document')).value;
    currentDate.setDate(currentDate.getDate() - 1);
    const creationDate = currentDate.toISOString();
    const state = true;
    const rolSelecionado = (<HTMLInputElement>document.getElementById('rol')).value;
    const selectedRole = this.roles[rolSelecionado];
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const telefono = (<HTMLInputElement>document.getElementById('telefono')).value;
    const ciudadSeleccionada = (<HTMLInputElement>document.getElementById('select-ciudad')).value;

    const jsonUsuario = {
      name,
      lastname,
      username,
      password,
      document: doc,
      creationDate,
      state,
      email,
      telefono,
      ciudad: {
        id: ciudadSeleccionada
      },
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
        // const dialogRef = this.dialog.open(ModalExitoComponent, {
        //   width: '400px',
        //   data: {titulo: 'Usuario creado exitosamente', mensaje: '¡Felicidades, has creado un nuevo usuario!'}
        // });
        // dialogRef.afterClosed().subscribe(result => {
        //   this.router.navigate(['/usuariosGrid']);
        // });
        this.router.navigate(['/usuariosGrid']);
      }, error => {
        console.error(error);
      });
    } else {
      alert('httpOptions no está definido, intente iniciar sesion nuevamente');
      console.log('httpOptions no está definido');
    }
  }

  onSelectPais(idPais: string) {
    this.obtenerDatosCiudad(idPais).subscribe((data: any) => {
      const ciudades = data.response;
      const selectCiudad = document.getElementById('select-ciudad') as HTMLSelectElement;
  
      // Limpiar el select de ciudades
      selectCiudad.innerHTML = '';
  
      // Crear un option por cada ciudad en la respuesta del JSON
      ciudades.forEach((ciudad: any) => {
        const option = document.createElement('option');
        option.value = ciudad.id;
        option.text = ciudad.name;
        selectCiudad.appendChild(option);
      });
      selectCiudad.disabled = false;

    });
  }

  obtenerDatosCiudad(id: string) {
    const params = { id: id };
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/ubicacion/getCiudadPaises?idPais=${params.id}`;
    const response = this.http.get(url, this.httpOptions); 
    return response  
  }

  obtenerDatosPais(): Observable<any> {
    console.log(this.token);
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/ubicacion/getPaises`;
    return this.http.get(url, this.httpOptions);
  }
   
}
