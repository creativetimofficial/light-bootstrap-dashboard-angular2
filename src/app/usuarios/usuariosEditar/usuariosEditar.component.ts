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
  selector: 'app-usuariosEditar',
  templateUrl: './usuariosEditar.component.html',
  styleUrls: ['./usuariosEditar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UsuariosEditarComponent implements OnInit {

  usuariosEditarForm: FormGroup;
  httpOptions: any;
  token: any;
  response: any;
  datosCargados: boolean;
  @ViewChild('fechaInput') fechaInput: ElementRef;

  roles = {
    9: { name: "Rol admin", detalle: "ROLE_ADMIN" },
    10: { name: "Rol usuario", detalle: "ROLE_USUARIO" },
    11: { name: "Rol diosesano", detalle: "ROLE_DIOSESANO" },
    12: { name: "Rol regional", detalle: "ROLE_REGIONAL" },
    13: { name: "Rol zonal", detalle: "ROLE_ZONAL" },
    14: { name: "Rol latam", detalle: "ROLE_LATAM" },
  }
  ciudades: any[]; // Declarar la propiedad 'ciudades'
  paises: any[]; // Declarar la propiedad 'paises'
  selectedCiudad: string;
  selectedPais: string;
  data: any;
  pais: any; // cambia a tipo any
  creationDate: string;


  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.usuariosEditarForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      creationDate: [null, Validators.required],
      lastname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      document: [null, Validators.required],
      state: [null, Validators.required],
      rol: [null, Validators.required],
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
    const elementId = this.activatedRoute.snapshot.paramMap.get('id');

    this.obtenerDatosUsuario(elementId).subscribe(data => {
      // Asignar los datos del elemento al formulario utilizando setValue()
      let fecha = new Date(data.response.creationDate);
      let fechaFormateada = fecha.toISOString().substring(0, 10);
      this.usuariosEditarForm.controls['creationDate'].setValue(fechaFormateada);
      this.usuariosEditarForm.controls['name'].setValue(data.response.name);
      this.usuariosEditarForm.controls['lastname'].setValue(data.response.lastname);
      this.usuariosEditarForm.controls['username'].setValue(data.response.username);
      this.usuariosEditarForm.controls['password'].setValue(data.response.password);
      this.usuariosEditarForm.controls['document'].setValue(data.response.document);


     console.log(data.response.ciudad.pais)
     console.log(data.response.ciudad)
     
     // Gestion de paises
     const pais = data.response.ciudad.pais;
     const ciudad = data.response.ciudad;
    
     this.usuariosEditarForm.controls['select-pais'].setValue(pais.id);

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
       this.usuariosEditarForm.controls['select-pais'].setValue(pais.id);
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
       this.usuariosEditarForm.controls['select-ciudad'].setValue(ciudad.id);
     });
      // Crear opciones para el select de roles
      const rolesKeys = Object.keys(this.roles);
      const selectRol = document.getElementById('select-rol') as HTMLSelectElement;
      selectRol.innerHTML = '';
      rolesKeys.forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.text = this.roles[key].name;
        selectRol.appendChild(option);
      });

      // Establecer el rol seleccionado en el select
      const selectedRol = this.roles[data.response.roles.id];
      this.usuariosEditarForm.controls['rol'].setValue(selectedRol.name);
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
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    const name = (<HTMLInputElement>document.getElementById('name')).value;
    const lastname = (<HTMLInputElement>document.getElementById('lastname')).value;
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    const data = { document: (<HTMLInputElement>document.getElementById('document')).value };
    const state = true;
    const rolSelecionado = (<HTMLInputElement>document.getElementById('select-rol')).value;
    const selectedRole = this.roles[rolSelecionado];
    const ciudadSeleccionada = (<HTMLInputElement>document.getElementById('select-ciudad')).value;

    const jsonUsuario = {
      id,
      name,
      lastname,
      username,
      password,
      data,
      state,
      roles: [{
        id: rolSelecionado,
        name: selectedRole.name,
        detalle: selectedRole.detalle
      }],
      ciudad: {
        id: ciudadSeleccionada
      },
    };
    console.error(jsonUsuario);

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
      this.usuariosEditarForm.controls['select-ciudad'].reset(); 
      
    });
  }

  obtenerDatosCiudad(id: string) {
    const params = { id: id };
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/ubicacion/getCiudadPaises?idPais=${params.id}`;
    const response = this.http.get(url, this.httpOptions); 
    return response  
  }

  obtenerDatosPais(id: string){
    const params = { id: id };
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/ubicacion/getPaises?idPais=${params.id}`;
    const response = this.http.get(url, this.httpOptions); 

    return response  
  }
}
