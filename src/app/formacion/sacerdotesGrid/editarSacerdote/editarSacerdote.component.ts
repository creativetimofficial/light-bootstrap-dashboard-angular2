import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup,  Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component'; 
import { ConfirmCreationComponent } from 'app/shared/confirm-creation/confirm-creation.component';



@Component({
  selector: 'app-editarSacerdote',
  templateUrl: './editarSacerdote.component.html',
  styleUrls: ['./editarSacerdote.component.css']
})
export class EditarSacerdoteComponent implements OnInit {

  editarSacerdoteForm: FormGroup;
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
  fechaCreacion: string;
  rolId: number;
  mostrarBotonGuardar: boolean = false;
  
  constructor(private http: HttpClient, private router: Router,public dialog: MatDialog,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.editarSacerdoteForm = this.formBuilder.group({
      id: [null],
      fechaCreacion: [null, Validators.required],
      jornadaDialogo: [null, Validators.required],
      retornoEspiritual: [null, Validators.required],
      lenguajeAmor: [null, Validators.required],
      guiaDeRelacion: [null, Validators.required],
      sacramento: [null, Validators.required],
      diosEnSacramento: [null, Validators.required],
      diosEnVida: [null, Validators.required],
      patronesComportamiento: [null, Validators.required],
      dialogoProfundo: [null, Validators.required],
      servidoresPostEncuentro: [null, Validators.required],
      formacionAcompanantes: [null, Validators.required],
      padreNuestro: [null, Validators.required],
      transmisionNacional: [null, Validators.required],
      'select-pais': ['', Validators.required],
      'select-ciudad': ['', Validators.required]
    });
  }
  ngOnInit() {


    let token = localStorage.getItem('jwt');
    let rolIdString = localStorage.getItem('rolId');
    this.rolId = parseInt(rolIdString, 10);
    this.mostrarBotonGuardar = this.actualizarMostrarBotonGuardar(this.rolId);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
    const elementId = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.obtenerSacerdote(elementId).subscribe(data => {
      // Asignar los datos del elemento al formulario utilizando setValue()
   
      let fecha = new Date(data.response.fechaCreacion);
      fecha.setDate(fecha.getDate() - 1); // Resta un día
      let fechaFormateada = fecha.toISOString().substring(0, 10);
      this.editarSacerdoteForm.controls['fechaCreacion'].setValue(fechaFormateada);
      this.editarSacerdoteForm.controls['jornadaDialogo'].setValue(data.response.jornadaDialogo);
      this.editarSacerdoteForm.controls['retornoEspiritual'].setValue(data.response.retornoEspiritual);
      this.editarSacerdoteForm.controls['lenguajeAmor'].setValue(data.response.lenguajeAmor);
      this.editarSacerdoteForm.controls['guiaDeRelacion'].setValue(data.response.guiaDeRelacion);
      this.editarSacerdoteForm.controls['sacramento'].setValue(data.response.sacramento);
      this.editarSacerdoteForm.controls['diosEnSacramento'].setValue(data.response.diosEnSacramento);
      this.editarSacerdoteForm.controls['diosEnVida'].setValue(data.response.diosEnVida);
      this.editarSacerdoteForm.controls['patronesComportamiento'].setValue(data.response.patronesComportamiento);
      this.editarSacerdoteForm.controls['dialogoProfundo'].setValue(data.response.dialogoProfundo);
      this.editarSacerdoteForm.controls['servidoresPostEncuentro'].setValue(data.response.servidoresPostEncuentro);
      this.editarSacerdoteForm.controls['formacionAcompanantes'].setValue(data.response.formacionAcompanantes);
      this.editarSacerdoteForm.controls['padreNuestro'].setValue(data.response.padreNuestro);
      this.editarSacerdoteForm.controls['transmisionNacional'].setValue(data.response.transmisionNacional);

    
      const pais = data.response.ciudad.pais;
      const ciudad = data.response.ciudad;
      
      console.log(pais.id)
      this.editarSacerdoteForm.controls['select-pais'].setValue(pais.id);

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
        this.editarSacerdoteForm.controls['select-pais'].setValue(pais.id);
      });

      this.obtenerDatosCiudad(pais.id).subscribe((data: any) => {
        const ciudades = data.response;
        console.log(ciudades);
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
        this.editarSacerdoteForm.controls['select-ciudad'].setValue(ciudad.id);
      });
    });
   
  }
 actualizarMostrarBotonGuardar(rol: number): boolean {
    console.log(rol);
    const mostrarBoton = rol !== 1;
    console.log(mostrarBoton);
    return mostrarBoton;
  }
  obtenerSacerdote(id: string): Observable<any> {
    const params = { id: id };
    console.log(this.token);
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/formacion/sacerdote/get?id=${params.id}`;
    const response = this.http.get(url, this.httpOptions); 

    return response  
  }

  openDialog():void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: "¿Estás seguro que la informacion ingresada es correcta?"
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if(res){
        this.editarSacerdote();
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

  editarSacerdote() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const fecha = (document.getElementById("fechaCreacion") as HTMLInputElement).value;
    const fechaObjeto = new Date(fecha);
    const fechaCreacion = fechaObjeto.toISOString();
    const jornadaDialogo = (<HTMLInputElement>document.getElementById('jornadaDialogo')).value;
    const retornoEspiritual = (<HTMLInputElement>document.getElementById('retornoEspiritual')).value;
    const lenguajeAmor = (<HTMLInputElement>document.getElementById('lenguajeAmor')).value;
    const guiaDeRelacion = (<HTMLInputElement>document.getElementById('guiaDeRelacion')).value;
    const sacramento = (<HTMLInputElement>document.getElementById('sacramento')).value;
    const diosEnSacramento = (<HTMLInputElement>document.getElementById('diosEnSacramento')).value;
    const diosEnVida = (<HTMLInputElement>document.getElementById('diosEnVida')).value;
    const patronesComportamiento = (<HTMLInputElement>document.getElementById('patronesComportamiento')).value;
    const dialogoProfundo = (<HTMLInputElement>document.getElementById('dialogoProfundo')).value;
    const servidoresPostEncuentro = (<HTMLInputElement>document.getElementById('servidoresPostEncuentro')).value;
    const formacionAcompanantes = (<HTMLInputElement>document.getElementById('formacionAcompanantes')).value;
    const padreNuestro = (<HTMLInputElement>document.getElementById('padreNuestro')).value;
    const transmisionNacional = (<HTMLInputElement>document.getElementById('transmisionNacional')).value;
    const ciudadSeleccionada = (<HTMLInputElement>document.getElementById('select-ciudad')).value;

    const editSacerdote = {
      id,
      fechaCreacion,
      jornadaDialogo,
      retornoEspiritual,
      lenguajeAmor,
      guiaDeRelacion, 
      sacramento,     
      diosEnSacramento,     
      diosEnVida,     
      patronesComportamiento,     
      dialogoProfundo,     
      servidoresPostEncuentro,     
      formacionAcompanantes, 
      padreNuestro,
      transmisionNacional,
      ciudad: {
        id: ciudadSeleccionada
      },
    };
    const jsonSacerdote = JSON.stringify(editSacerdote); // Convertir el objeto en una cadena JSON
    console.log(jsonSacerdote);
    console.log(this.httpOptions);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/formacion/sacerdote/update', jsonSacerdote, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        this.openDialogConfirm();
        this.router.navigate(['/sacerdotesGrid']);
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
      this.editarSacerdoteForm.controls['select-ciudad'].reset(); 
      
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
}