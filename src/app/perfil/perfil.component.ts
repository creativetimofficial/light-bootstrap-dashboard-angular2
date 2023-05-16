import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup,  Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component'; 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PerfilComponent implements OnInit {

  perfilForm: FormGroup;
  httpOptions: any;
  token: any;
  response: any;
  datosCargados: boolean;
  @ViewChild('fechaInput') fechaInput: ElementRef;
  ciudades: any[]; // Declarar la propiedad 'ciudades'
  paises: any[]; // Declarar la propiedad 'paises'
  roles: any[] = [];
  selectedCiudad: string;
  selectedPais: string;
  data: any;
  pais: any; // cambia a tipo any
  creationDate: string;

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.perfilForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      creationDate: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      document: [null, Validators.required],
      state: [null, Validators.required],
      email: [null, Validators.required],
      telefono: [null, Validators.required],
      'select-rol': ['', Validators.required],
      'select-pais': ['', Validators.required],
      'select-ciudad': ['', Validators.required]
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
    let userId = localStorage.getItem('userId');

    this.obtenerDatosUsuario(userId).subscribe(data => {
      // Asignar los datos del elemento al formulario utilizando setValue()
      let fecha = new Date(data.response.creationDate);
      let fechaFormateada = fecha.toISOString().substring(0, 10);
      this.perfilForm.controls['creationDate'].setValue(fechaFormateada);
      this.perfilForm.controls['name'].setValue(data.response.name);
      this.perfilForm.controls['lastname'].setValue(data.response.lastname);
      this.perfilForm.controls['username'].setValue(data.response.username);
      this.perfilForm.controls['password'].setValue(data.response.password);
      this.perfilForm.controls['document'].setValue(data.response.document);
      this.perfilForm.controls['email'].setValue(data.response.email);
      this.perfilForm.controls['telefono'].setValue(data.response.telefono);

     
     // Gestion de paises
     const pais = data.response.ciudad.pais;
     const ciudad = data.response.ciudad;
     const rol = data.response.roles[0].id;

     this.perfilForm.controls['select-pais'].setValue(pais.id);

     this.obtenerDatosPais(pais.id).subscribe((data: any) => {
       const paises = data.response;
       const selectPais = document.getElementById('select-pais') as HTMLSelectElement;
   
       selectPais.innerHTML = '';
   
       paises.forEach((pais: any) => {
         const option = document.createElement('option');
         option.value = pais.id;
         option.text = pais.name;
         selectPais.appendChild(option);
       });
   
       // Establecemos el país seleccionado en el select del país
       this.perfilForm.controls['select-pais'].setValue(pais.id);
     });

     this.obtenerDatosCiudad(pais.id).subscribe((data: any) => {
       const ciudades = data.response;
       const selectCiudad = document.getElementById('select-ciudad') as HTMLSelectElement;
    
       selectCiudad.innerHTML = '';
   
       ciudades.forEach((ciudad: any) => {
         const option = document.createElement('option');
         option.value = ciudad.id;
         option.text = ciudad.name;
         selectCiudad.appendChild(option);
       });
       selectCiudad.disabled = false;
   
       // Establecemos la ciudad seleccionada en el select de la ciudad
       this.perfilForm.controls['select-ciudad'].setValue(ciudad.id);
     });

     this.obtenerDatosRol().subscribe((data: any) => {
      const roles = data.response;
      const selectRol = document.getElementById('select-rol') as HTMLSelectElement;
  
      selectRol.innerHTML = '';
  
      roles.forEach((rol: any) => {
          const option = document.createElement('option');
          option.value = rol.id;
          option.text = rol.name;
          selectRol.appendChild(option);
      });
      this.perfilForm.controls['select-rol'].setValue(rol);
    });
  
    });
  }
  obtenerDatosUsuario(id: string): Observable<any> {
    const params = { id: id };
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/user/get?id=${params.id}`;
    const response = this.http.get(url, this.httpOptions); 
    return response.pipe(
      map((data: any) => {
        console.log(data); // aquí puedes imprimir la respuesta si lo deseas
        return data;
      }),
      catchError(error => {
        console.error(error);
        throw error;
      })
    );  
  }

  openDialog():void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: "¿Estás seguro que la informacion ingresada es correcta?"
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if(res){
        this.editarUsuario();
      }
    })
  }
  editarUsuario() {
    const id = localStorage.getItem('userId');
    const name = (<HTMLInputElement>document.getElementById('name')).value;
    const fecha = (document.getElementById("fechaCreacion") as HTMLInputElement).value;
    const fechaObjeto = new Date(fecha);
    const creationDate = fechaObjeto.toISOString();
    const lastname = (<HTMLInputElement>document.getElementById('lastname')).value;
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    const doc = (<HTMLInputElement>document.getElementById('document')).value;
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const telefono = (<HTMLInputElement>document.getElementById('telefono')).value;

    const ciudadSeleccionada = parseInt((<HTMLInputElement>document.getElementById('select-ciudad')).value, 10);
    const state = true;
    const rolSeleccionado = parseInt((<HTMLInputElement>document.getElementById('select-rol')).value, 10);
 

    const jsonUsuario = {
      id,
      name,
      creationDate,
      lastname,
      username,
      password,
      document: doc,
      state,
      email,
      telefono,
      roles: [
        {
        id: rolSeleccionado,
        }
      ],
      ciudad: {
        id: ciudadSeleccionada
      },
    };
    console.log(jsonUsuario);

    const nuevoUsuario = JSON.stringify(jsonUsuario); // Convertir el objeto en una cadena JSON

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/user/updateUsuario', nuevoUsuario, this.httpOptions)
      .subscribe(data => {
        alert('Usuario Actualizado exitosamente');
        this.router.navigate(['/usuariosGrid']);
      }, error => {
        console.error(error);
      });
    } else {
      alert('httpOptions no está definido, intente iniciar sesion nuevamente');
    }
  }
  onSelectPais(idPais: string) {
    this.obtenerDatosCiudad(idPais).subscribe((data: any) => {
      const ciudades = data.response;
      const selectCiudad = document.getElementById('select-ciudad') as HTMLSelectElement;
      
      selectCiudad.innerHTML = '';
      
      ciudades.forEach((ciudad: any) => {
        const option = document.createElement('option');
        option.value = ciudad.id;
        option.text = ciudad.name;
        selectCiudad.appendChild(option);
      });
      selectCiudad.disabled = false;
      
      // reiniciar el selector de ciudades
      this.perfilForm.controls['select-ciudad'].reset(); 
      
    });
  }

  obtenerDatosCiudad(id: string) {
    const params = { id: id };
    let userId = localStorage.getItem('userId');
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/ubicacion/getCiudadPaises?id=${userId}`;
    const response = this.http.get(url, this.httpOptions); 
    return response  
  }

  obtenerDatosPais(id: string){
    const params = { id: id };
    let userId = localStorage.getItem('userId');
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/ubicacion/getPaises?id=${userId}`;
    const response = this.http.get(url, this.httpOptions); 

    return response  
  }
  obtenerDatosRol(){
    let userId = localStorage.getItem('userId');
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/rol/getRoles?id=${userId}`;
    const response = this.http.get(url, this.httpOptions); 
    return response  
  }
}
