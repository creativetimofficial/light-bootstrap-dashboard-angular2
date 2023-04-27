import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, NgForm , Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';

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


  fechaCreacion: string;

  constructor(private http: HttpClient, private router: Router,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.editarPrimerPilarForm = this.formBuilder.group({
      id: [null],
      fechaCreacion: [null, Validators.required],
      numFDS: [null, Validators.required],
      numMatrinoniosVivieron: [null, Validators.required],
      numSacerdotesVivieron: [null, Validators.required],
      numReligiososVivieron: [null, Validators.required],
      'select-ciudad': this.formBuilder.group({
        id: [null, Validators.required],
        name: [null, Validators.required]
      }),
      'select-pais': this.formBuilder.group({
          id: [null, Validators.required],
          name: [null, Validators.required]
      })
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
      // Asignar los datos del elemento al formulario utilizando setValue()
      let fecha = new Date(data.response.fechaCreacion);
      let fechaFormateada = fecha.toISOString().substring(0, 10);
      this.editarPrimerPilarForm.controls['fechaCreacion'].setValue(fechaFormateada);
      this.editarPrimerPilarForm.controls['numFDS'].setValue(data.response.numMatrinoniosVivieron);
      this.editarPrimerPilarForm.controls['numMatrinoniosVivieron'].setValue(data.response.numMatrinoniosVivieron);
      this.editarPrimerPilarForm.controls['numSacerdotesVivieron'].setValue(data.response.numSacerdotesVivieron);
      this.editarPrimerPilarForm.controls['numReligiososVivieron'].setValue(data.response.numReligiososVivieron);
      console.log(data.response.ciudad.name);
      console.log(data.response.ciudad.pais.name);

      

      // this.editarPrimerPilarForm.controls['select-ciudad'].setValue(data.response.ciudad.id);
      // this.editarPrimerPilarForm.controls['select-pais'].setValue(data.response.ciudad.pais.id);


      this.datosCargados = true;
    });
 

  }

  obtenerDatosDelPilar(id: string): Observable<any> {
    const params = { id: id };
    console.log(this.token);
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/pilar/primerPilar/get?id=${params.id}`;
    const response = this.http.get(url, this.httpOptions); 

    return response  
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
    const editPrimerPilar = {
      id,
      fechaCreacion,
      numFDS,
      numMatrinoniosVivieron,
      numSacerdotesVivieron,
      numReligiososVivieron,
    };
    const jsonPrimerPilar = JSON.stringify(editPrimerPilar); // Convertir el objeto en una cadena JSON
    console.log(jsonPrimerPilar);
    console.log(this.httpOptions);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/pilar/primerPilar/update', jsonPrimerPilar, this.httpOptions)
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