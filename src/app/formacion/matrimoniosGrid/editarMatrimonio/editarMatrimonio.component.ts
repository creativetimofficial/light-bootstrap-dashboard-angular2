import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup,  Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component'; 


@Component({
  selector: 'app-editarMatrimonio',
  templateUrl: './editarMatrimonio.component.html',
  styleUrls: ['./editarMatrimonio.component.css']
})
export class EditarMatrimonioComponent implements OnInit {

  editarMatrimonioForm: FormGroup;
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
    this.editarMatrimonioForm = this.formBuilder.group({
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
    
    this.obtenerMatrimonio(elementId).subscribe(data => {
      // Asignar los datos del elemento al formulario utilizando setValue()

      let fecha = new Date(data.response.fechaCreacion);
      fecha.setDate(fecha.getDate() - 1); // Resta un día
      let fechaFormateada = fecha.toISOString().substring(0, 10);
      this.editarMatrimonioForm.controls['fechaCreacion'].setValue(fechaFormateada);
      this.editarMatrimonioForm.controls['jornadaDialogo'].setValue(data.response.jornadaDialogo);
      this.editarMatrimonioForm.controls['retornoEspiritual'].setValue(data.response.retornoEspiritual);
      this.editarMatrimonioForm.controls['lenguajeAmor'].setValue(data.response.lenguajeAmor);
      this.editarMatrimonioForm.controls['guiaDeRelacion'].setValue(data.response.guiaDeRelacion);
      this.editarMatrimonioForm.controls['sacramento'].setValue(data.response.sacramento);
      this.editarMatrimonioForm.controls['diosEnSacramento'].setValue(data.response.diosEnSacramento);
      this.editarMatrimonioForm.controls['diosEnVida'].setValue(data.response.diosEnVida);
      this.editarMatrimonioForm.controls['patronesComportamiento'].setValue(data.response.patronesComportamiento);
      this.editarMatrimonioForm.controls['dialogoProfundo'].setValue(data.response.dialogoProfundo);
      this.editarMatrimonioForm.controls['servidoresPostEncuentro'].setValue(data.response.servidoresPostEncuentro);
      this.editarMatrimonioForm.controls['formacionAcompanantes'].setValue(data.response.formacionAcompanantes);
      this.editarMatrimonioForm.controls['padreNuestro'].setValue(data.response.padreNuestro);
      this.editarMatrimonioForm.controls['transmisionNacional'].setValue(data.response.transmisionNacional);

      const pais = data.response.ciudad.pais;
      const ciudad = data.response.ciudad;
      
      console.log(pais.id)
      this.editarMatrimonioForm.controls['select-pais'].setValue(pais.id);

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
        this.editarMatrimonioForm.controls['select-pais'].setValue(pais.id);
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
        this.editarMatrimonioForm.controls['select-ciudad'].setValue(ciudad.id);
      });
      
    });
   
  }
  actualizarMostrarBotonGuardar(rol: number): boolean {
    console.log(rol);
    const mostrarBoton = rol !== 1;
    console.log(mostrarBoton);
    return mostrarBoton;
  }
  obtenerMatrimonio(id: string): Observable<any> {
    const params = { id: id };
    console.log(this.token);
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/formacion/matrimonio/get?id=${params.id}`;
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
        this.editarMatrimonio();
      }
    })
  }

  editarMatrimonio() {
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

    const editarMatrimonio = {
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
    const jsonMatrimonio = JSON.stringify(editarMatrimonio); // Convertir el objeto en una cadena JSON
    console.log(jsonMatrimonio);
    console.log(this.httpOptions);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/formacion/matrimonio/create', jsonMatrimonio, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        alert('Registro Actualizado');
        this.router.navigate(['/matrimoniosGrid']);
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
      this.editarMatrimonioForm.controls['select-ciudad'].reset(); 
      
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