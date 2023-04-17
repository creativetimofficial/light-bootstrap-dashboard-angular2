import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup,  Validators} from '@angular/forms';


@Component({
  selector: 'app-editarTercerPilar',
  templateUrl: './editarTercerPilar.component.html',
  styleUrls: ['./editarTercerPilar.component.css']
})
export class EditarTercerPilarComponent implements OnInit {

  editarTercerPilarForm: FormGroup;
  httpOptions: any;
  token: any;
  response: any;
  datosCargados: boolean;
  @ViewChild('fechaInput') fechaInput: ElementRef;

  fechaCreacion: string;

  constructor(private http: HttpClient, private router: Router,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.editarTercerPilarForm = this.formBuilder.group({
      id: [null],
      fechaCreacion: [null, Validators.required],
      numRegiones: [null, Validators.required],
      numDiocesisEstablecidas: [null, Validators.required],
      numDiocesisContacto: [null, Validators.required],
      numDiocesisExpansion: [null, Validators.required],
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
      this.editarTercerPilarForm.controls['fechaCreacion'].setValue(fechaFormateada);
      this.editarTercerPilarForm.controls['numRegiones'].setValue(data.response.numRegiones);
      this.editarTercerPilarForm.controls['numDiocesisEstablecidas'].setValue(data.response.numDiocesisEstablecidas);
      this.editarTercerPilarForm.controls['numDiocesisContacto'].setValue(data.response.numDiocesisContacto);
      this.editarTercerPilarForm.controls['numDiocesisExpansion'].setValue(data.response.numDiocesisExpansion);

      console.log(data.response);

      this.datosCargados = true;
      console.log(this.datosCargados);
    });
   
  }

  obtenerDatosDelPilar(id: string): Observable<any> {
    const params = { id: id };
    console.log(this.token);
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/pilar/tercerPilar/get?id=${params.id}`;
    const response = this.http.get(url, this.httpOptions); 

    return response  
  }
  editarPilar() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const fecha = (document.getElementById("fechaCreacion") as HTMLInputElement).value;
    const fechaObjeto = new Date(fecha);
    const fechaCreacion = fechaObjeto.toISOString();
    const numRegiones = (<HTMLInputElement>document.getElementById('numRegiones')).value;
    const numDiocesisEstablecidas = (<HTMLInputElement>document.getElementById('numDiocesisEstablecidas')).value;
    const numDiocesisContacto = (<HTMLInputElement>document.getElementById('numDiocesisContacto')).value;
    const numDiocesisExpansion = (<HTMLInputElement>document.getElementById('numDiocesisExpansion')).value;
    const editPrimerPilar = {
      id,
      fechaCreacion,
      numRegiones,
      numDiocesisEstablecidas,
      numDiocesisContacto,
      numDiocesisExpansion   
    };
    const jsonTrecerPilar = JSON.stringify(editPrimerPilar); // Convertir el objeto en una cadena JSON
    console.log(jsonTrecerPilar);
    console.log(this.httpOptions);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/pilar/tercerPilar/update', jsonTrecerPilar, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        alert('Pilar Actualizado');
        this.router.navigate(['/tercerPilarGrid']);
      }, error => {
        console.error(error);
      });
    } else {      
      alert('httpOptions no está definido, intente iniciar sesion nuevamente');
    }
  }
}