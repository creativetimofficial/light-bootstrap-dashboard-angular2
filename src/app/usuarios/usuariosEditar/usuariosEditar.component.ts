import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup,  Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component'; 
import { ConfirmCreationComponent } from 'app/shared/confirm-creation/confirm-creation.component';


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
  
  ciudades: any[]; // Declarar la propiedad 'ciudades'
  paises: any[]; // Declarar la propiedad 'paises'
  selectedCiudad: string;
  selectedPais: string;
  data: any;
  pais: any; // cambia a tipo any
  creationDate: string;
  roles: any[] = [];


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
      email: [null, Validators.required],
      telefono: [null, Validators.required],
      'select-rol': ['', Validators.required],
      'select-pais': ['', Validators.required],
      'select-ciudad': ['', Validators.required]
    });
  }
  ngOnInit() {
   
    let token = localStorage.getItem('jwt');
    let rolIdString = localStorage.getItem('rolId');

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
      fecha.setDate(fecha.getDate() - 1);
      let fechaFormateada = fecha.toISOString().substring(0, 10);;
      this.usuariosEditarForm.controls['creationDate'].setValue(fechaFormateada);
      this.usuariosEditarForm.controls['name'].setValue(data.response.name);
      this.usuariosEditarForm.controls['lastname'].setValue(data.response.lastname);
      this.usuariosEditarForm.controls['username'].setValue(data.response.username);
      this.usuariosEditarForm.controls['password'].setValue(data.response.password);
      this.usuariosEditarForm.controls['document'].setValue(data.response.document);
      this.usuariosEditarForm.controls['email'].setValue(data.response.email);
      this.usuariosEditarForm.controls['telefono'].setValue(data.response.telefono);


     // Gestion de paises
     const pais = data.response.ciudad.pais;
     const ciudad = data.response.ciudad;
     const rol = data.response.roles[0].id;
     console.log(rol + "este es el id del rol");

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
        this.usuariosEditarForm.controls['select-rol'].setValue(rol);
    });

    });
  }
  obtenerDatosUsuario(id: string): Observable<any> {
    const params = { id: id };
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/user/get?id=${params.id}`;
    const response = this.http.get(url, this.httpOptions); 
    return response.pipe(
      map((data: any) => {
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
      if(res){
        this.editarUsuario();
      }
    })
  }

  openDialogConfirm():void{
    const dialogRef = this.dialog.open(ConfirmCreationComponent,{
      data: ""
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if(res){
        close;
      }
    })
  }

  editarUsuario() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
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
      lastname,
      username,
      creationDate,
      password,
      document: doc,
      email,
      telefono,
      state,
      roles: [
        {
        id: rolSeleccionado,
        }
      ],
      ciudad: {
        id: ciudadSeleccionada
      },
    };

    const nuevoUsuario = JSON.stringify(jsonUsuario); // Convertir el objeto en una cadena JSON

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/user/updateUsuario', nuevoUsuario, this.httpOptions)
      .subscribe(data => {
        this.openDialogConfirm();
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
    let userId = localStorage.getItem('userId');
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/ubicacion/getCiudadPaises?id=${userId}`;
    const response = this.http.get(url, this.httpOptions); 
    return response  
  }

  obtenerDatosPais(id: string){
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
