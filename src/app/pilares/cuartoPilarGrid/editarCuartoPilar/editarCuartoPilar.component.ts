import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup,  Validators} from '@angular/forms';


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

  fechaCreacion: string;

  constructor(private http: HttpClient, private router: Router,
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
      this.editarCuartoPilarForm.controls['fechaCreacion'].setValue(fechaFormateada);
      this.editarCuartoPilarForm.controls['numServidoresPostActivos'].setValue(data.response.numServidoresPostActivos);
      this.editarCuartoPilarForm.controls['numFdsPostPeriodo'].setValue(data.response.numFdsPostPeriodo);
      this.editarCuartoPilarForm.controls['numMatrimonioVivieron'].setValue(data.response.numMatrimonioVivieron);
      this.editarCuartoPilarForm.controls['numComunidadApoyo'].setValue(data.response.numComunidadApoyo);
      this.editarCuartoPilarForm.controls['numServiciosComunidad'].setValue(data.response.numServiciosComunidad);
      this.editarCuartoPilarForm.controls['numMatrimoiosComunidad'].setValue(data.response.numMatrimoiosComunidad);

      console.log(data.response);

      this.datosCargados = true;
      console.log(this.datosCargados);
    });
   
  }

  obtenerDatosDelPilar(id: string): Observable<any> {
    const params = { id: id };
    console.log(this.token);
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/pilar/cuartoPilar/get?id=${params.id}`;
    const response = this.http.get(url, this.httpOptions); 

    return response  
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

    const editCuartoPilar = {
      id,
      fechaCreacion,
      numServidoresPostActivos,
      numFdsPostPeriodo,
      numMatrimonioVivieron,
      numComunidadApoyo,
      numServiciosComunidad,
      numMatrimoiosComunidad
    };
    const jsonCuartoPilar = JSON.stringify(editCuartoPilar); // Convertir el objeto en una cadena JSON
    console.log(jsonCuartoPilar);
    console.log(this.httpOptions);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/pilar/cuartoPilar/update', jsonCuartoPilar, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        alert('Pilar Actualizado');
        this.router.navigate(['/cuartoPilarGrid']);
      }, error => {
        console.error(error);
      });
    } else {      
      alert('httpOptions no está definido, intente iniciar sesion nuevamente');
    }
  }
}