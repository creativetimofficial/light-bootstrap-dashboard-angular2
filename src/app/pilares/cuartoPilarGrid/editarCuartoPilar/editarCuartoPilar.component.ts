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
  selector: 'app-editarCuartoPilar',
  templateUrl: './editarCuartoPilar.component.html',
  styleUrls: ['./editarCuartoPilar.component.css']
})
export class EditarCuartoPilarComponent implements OnInit {

  editarCuartoPilarForm: FormGroup;
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

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.editarCuartoPilarForm = this.formBuilder.group({
      id: [null],
      fechaCreacion: [null, Validators.required],
      numServidoresPostActivos: [null, Validators.required],
      numFdsPostPeriodo: [null, Validators.required],
      numMatrimonioVivieron: [null, Validators.required],
      numComunidadApoyo: [null, Validators.required],
      numServiciosComunidad: [null, Validators.required],
      numMatrimoiosComunidad: [null, Validators.required],
      numSacerdotesComunidad: [null, Validators.required],
      numReligiososComunidad: [null, Validators.required],
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
    
    this.obtenerDatosDelPilar(elementId).subscribe(data => {
      // Asignar los datos del elemento al formulario utilizando setValue()
   
      let fecha = new Date(data.response.fechaCreacion);
      let fechaFormateada = fecha.toISOString().substring(0, 10);
      this.editarCuartoPilarForm.controls['fechaCreacion'].setValue(fechaFormateada);
      this.editarCuartoPilarForm.controls['numServidoresPostActivos'].setValue(data.response.numServidoresPostActivos);
      this.editarCuartoPilarForm.controls['numFdsPostPeriodo'].setValue(data.response.numFdsPostPeriodo);
      this.editarCuartoPilarForm.controls['numMatrimonioVivieron'].setValue(data.response.numMatrimonioVivieron);
      this.editarCuartoPilarForm.controls['numComunidadApoyo'].setValue(data.response.numComunidadApoyo);
      this.editarCuartoPilarForm.controls['numServiciosComunidad'].setValue(data.response.numServiciosComunidad);
      this.editarCuartoPilarForm.controls['numMatrimoiosComunidad'].setValue(data.response.numMatrimoiosComunidad);
      this.editarCuartoPilarForm.controls['numSacerdotesComunidad'].setValue(data.response.numSacerdotesComunidad);
      this.editarCuartoPilarForm.controls['numReligiososComunidad'].setValue(data.response.numReligiososComunidad);
      const pais = data.response.ciudad.pais;
      const ciudad = data.response.ciudad;
      
      console.log(pais.id)
      this.editarCuartoPilarForm.controls['select-pais'].setValue(pais.id);

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
        this.editarCuartoPilarForm.controls['select-pais'].setValue(pais.id);
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
        this.editarCuartoPilarForm.controls['select-ciudad'].setValue(ciudad.id);
      });

      console.log(data.response);

      this.datosCargados = true;
      console.log(this.datosCargados);
    });

   
  }
  actualizarMostrarBotonGuardar(rol: number): boolean {
    console.log(rol);
    const mostrarBoton = rol !== 1;
    console.log(mostrarBoton);
    return mostrarBoton;
  }
  obtenerDatosDelPilar(id: string): Observable<any> {
    const params = { id: id };
    console.log(this.token);
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/pilar/cuartoPilar/get?id=${params.id}`;
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
        this.editarPilar();
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

  editarPilar() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const fecha = (document.getElementById("fechaCreacion") as HTMLInputElement).value;
    const fechaObjeto = new Date(fecha);
    const fechaCreacion = fechaObjeto.toISOString();
    const numServidoresPostActivos = (<HTMLInputElement>document.getElementById('numServidoresPostActivos')).value;
    const numFdsPostPeriodo = (<HTMLInputElement>document.getElementById('numFdsPostPeriodo')).value;
    const numMatrimonioVivieron = (<HTMLInputElement>document.getElementById('numMatrimonioVivieron')).value;
    const numComunidadApoyo = (<HTMLInputElement>document.getElementById('numComunidadApoyo')).value;
    const numServiciosComunidad = (<HTMLInputElement>document.getElementById('numServiciosComunidad')).value;
    const numMatrimoiosComunidad = (<HTMLInputElement>document.getElementById('numMatrimoiosComunidad')).value;
    const numSacerdotesComunidad = (<HTMLInputElement>document.getElementById('numSacerdotesComunidad')).value;
    const numReligiososComunidad = (<HTMLInputElement>document.getElementById('numReligiososComunidad')).value;
    const ciudadSeleccionada = (<HTMLInputElement>document.getElementById('select-ciudad')).value;

    const editCuartoPilar = {
      id,
      fechaCreacion,
      numServidoresPostActivos,
      numFdsPostPeriodo,
      numMatrimonioVivieron,
      numComunidadApoyo,
      numServiciosComunidad,
      numMatrimoiosComunidad,
      numSacerdotesComunidad,
      numReligiososComunidad,
      ciudad: {
        id: ciudadSeleccionada
      },
    };
    const jsonCuartoPilar = JSON.stringify(editCuartoPilar); // Convertir el objeto en una cadena JSON
    console.log(jsonCuartoPilar);
    console.log(this.httpOptions);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/pilar/cuartoPilar/update', jsonCuartoPilar, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        this.openDialogConfirm();
        this.router.navigate(['/cuartoPilarGrid']);
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
      this.editarCuartoPilarForm.controls['select-ciudad'].reset(); 
      
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