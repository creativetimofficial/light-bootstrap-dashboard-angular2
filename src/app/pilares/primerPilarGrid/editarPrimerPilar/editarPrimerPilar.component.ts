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
      numReligiosasVivieron: [null, Validators.required]
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
      this.editarPrimerPilarForm.controls['numReligiosasVivieron'].setValue(data.response.numReligiosasVivieron);
      

      console.log(data.response);

      this.datosCargados = true;
      console.log(this.datosCargados);
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
    const numReligiosasVivieron = (<HTMLInputElement>document.getElementById('numReligiosasVivieron')).value;
    const editPrimerPilar = {
      id,
      fechaCreacion,
      numFDS,
      numMatrinoniosVivieron,
      numSacerdotesVivieron,
      numReligiososVivieron,
      numReligiosasVivieron
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
}