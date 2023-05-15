import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, NgForm , Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component'; 

@Component({
  selector: 'app-editarPrimerPilar',
  templateUrl: './editarPrimerPilar.component.html',
  styleUrls: ['./editarPrimerPilar.component.css']
})
export class EditarPrimerPilarComponent implements OnInit {

  editarPrimerPilarForm: FormGroup;
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

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.editarPrimerPilarForm = this.formBuilder.group({
      id: [null],
      fechaCreacion: [null, Validators.required],
      numFDS: [null, Validators.required],
      numMatrinoniosVivieron: [null, Validators.required],
      numSacerdotesVivieron: [null, Validators.required],
      numReligiososVivieron: [null, Validators.required],
    
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
  
    this.obtenerDatosDelPilar(elementId).subscribe(data => {
      let fecha = new Date(data.response.fechaCreacion);
      let fechaFormateada = fecha.toISOString().substring(0, 10);
      this.editarPrimerPilarForm.controls['fechaCreacion'].setValue(fechaFormateada);
      this.editarPrimerPilarForm.controls['numFDS'].setValue(data.response.numMatrinoniosVivieron);
      this.editarPrimerPilarForm.controls['numMatrinoniosVivieron'].setValue(data.response.numMatrinoniosVivieron);
      this.editarPrimerPilarForm.controls['numSacerdotesVivieron'].setValue(data.response.numSacerdotesVivieron);
      this.editarPrimerPilarForm.controls['numReligiososVivieron'].setValue(data.response.numReligiososVivieron);
    
      const pais = data.response.ciudad.pais;
      const ciudad = data.response.ciudad;
      
      console.log(pais.id)
      this.editarPrimerPilarForm.controls['select-pais'].setValue(pais.id);

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
        this.editarPrimerPilarForm.controls['select-pais'].setValue(pais.id);
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
        this.editarPrimerPilarForm.controls['select-ciudad'].setValue(ciudad.id);
      });
      
    });
  }

  obtenerDatosDelPilar(id: string): Observable<any> {
    const params = { id: id };
    console.log(this.token);
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/pilar/primerPilar/get?id=${params.id}`;
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

  editarPilar() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const fecha = (document.getElementById("fechaCreacion") as HTMLInputElement).value;
    const fechaObjeto = new Date(fecha);
    const fechaCreacion = fechaObjeto.toISOString();
    const numFDS = (<HTMLInputElement>document.getElementById('numFDS')).value;
    const numMatrinoniosVivieron = (<HTMLInputElement>document.getElementById('numMatrinoniosVivieron')).value;
    const numSacerdotesVivieron = (<HTMLInputElement>document.getElementById('numSacerdotesVivieron')).value;
    const numReligiososVivieron = (<HTMLInputElement>document.getElementById('numReligiososVivieron')).value;
    const ciudadSeleccionada = (<HTMLInputElement>document.getElementById('select-ciudad')).value;

    const editPrimerPilar = {
      id,
      fechaCreacion,
      numFDS,
      numMatrinoniosVivieron,
      numSacerdotesVivieron,
      numReligiososVivieron,
      ciudad: {
        id: ciudadSeleccionada
      },
    };
    const jsonPrimerPilar = JSON.stringify(editPrimerPilar); // Convertir el objeto en una cadena JSON
    console.log(jsonPrimerPilar);
    console.log(this.httpOptions);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/pilar/primerPilar/create', jsonPrimerPilar, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        alert('Pilar Actualizado');
        this.router.navigate(['/primerPilarGrid']);
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
      this.editarPrimerPilarForm.controls['select-ciudad'].reset(); 
      
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