import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, NgForm , Validators} from '@angular/forms';


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
   
      this.editarPrimerPilarForm.controls['fechaCreacion'].setValue(data.response.fechaCreacion);
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
    
  }
}