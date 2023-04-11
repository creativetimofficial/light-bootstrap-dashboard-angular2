import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup,  Validators} from '@angular/forms';


@Component({
  selector: 'app-editarSegundoPilar',
  templateUrl: './editarSegundoPilar.component.html',
  styleUrls: ['./editarSegundoPilar.component.css']
})
export class EditarSegundoPilarComponent implements OnInit {

  editarSegundoPilarForm: FormGroup;
  httpOptions: any;
  token: any;
  response: any;
  datosCargados: boolean;
  @ViewChild('fechaInput') fechaInput: ElementRef;

  fechaCreacion: string;

  constructor(private http: HttpClient, private router: Router,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.editarSegundoPilarForm = this.formBuilder.group({
      id: [null],
      fechaCreacion: [null, Validators.required],
      numMatrimosServidoresActivos: [null, Validators.required],
      numSacerdotesServidoresActivos: [null, Validators.required],
      numMatrimosServidoresProfundoActivos: [null, Validators.required],
      numSacerdotesServidoresprofundoActivos: [null, Validators.required],
      numFdsProfundosPeriodo: [null, Validators.required],
      numReligiosasVivieron: [null, Validators.required],
      numMatrimosVivieronProfundo: [null, Validators.required],
      numSacerdotesVivieronProfundo: [null, Validators.required],
      numMatrimosDebutaronProfundo: [null, Validators.required],
      numSacerdotesDebutaronProfundo: [null, Validators.required],

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
   
      this.editarSegundoPilarForm.controls['fechaCreacion'].setValue(data.response.fechaCreacion);
      this.editarSegundoPilarForm.controls['numMatrimosServidoresActivos'].setValue(data.response.numMatrimosServidoresActivos);
      this.editarSegundoPilarForm.controls['numSacerdotesServidoresActivos'].setValue(data.response.numSacerdotesServidoresActivos);
      this.editarSegundoPilarForm.controls['numMatrimosServidoresProfundoActivos'].setValue(data.response.numMatrimosServidoresProfundoActivos);
      this.editarSegundoPilarForm.controls['numSacerdotesServidoresprofundoActivos'].setValue(data.response.numSacerdotesServidoresprofundoActivos);
      this.editarSegundoPilarForm.controls['numFdsProfundosPeriodo'].setValue(data.response.numFdsProfundosPeriodo);
      this.editarSegundoPilarForm.controls['numMatrimosVivieronProfundo'].setValue(data.response.numMatrimosVivieronProfundo);
      this.editarSegundoPilarForm.controls['numSacerdotesVivieronProfundo'].setValue(data.response.numSacerdotesVivieronProfundo);
      this.editarSegundoPilarForm.controls['numMatrimosDebutaronProfundo'].setValue(data.response.numMatrimosDebutaronProfundo);
      this.editarSegundoPilarForm.controls['numSacerdotesDebutaronProfundo'].setValue(data.response.numSacerdotesDebutaronProfundo);


      console.log(data.response);

      this.datosCargados = true;
      console.log(this.datosCargados);
    });
   
  }

  obtenerDatosDelPilar(id: string): Observable<any> {
    const params = { id: id };
    console.log(this.token);
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/pilar/segundoPilar/get?id=${params.id}`;
    const response = this.http.get(url, this.httpOptions); 

    return response  
  }
  editarPilar() {
    
  }
}