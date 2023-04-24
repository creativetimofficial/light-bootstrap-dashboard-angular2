import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,  FormGroup,  Validators} from '@angular/forms';


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

  fechaCreacion: string;

  constructor(private http: HttpClient, private router: Router,
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
    
    this.obtenerSacerdote(elementId).subscribe(data => {
      // Asignar los datos del elemento al formulario utilizando setValue()
   
      let fecha = new Date(data.response.fechaCreacion);
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

      console.log(data.response);

      this.datosCargados = true;
      console.log(this.datosCargados);
    });
   
  }

  obtenerSacerdote(id: string): Observable<any> {
    const params = { id: id };
    console.log(this.token);
    const url = `https://encuentro-matrimonial-backend.herokuapp.com/formacion/sacerdote/get?id=${params.id}`;
    const response = this.http.get(url, this.httpOptions); 

    return response  
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
      transmisionNacional
    };
    const jsonSacerdote = JSON.stringify(editSacerdote); // Convertir el objeto en una cadena JSON
    console.log(jsonSacerdote);
    console.log(this.httpOptions);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/formacion/sacerdote/update', jsonSacerdote, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        alert('Registro Actualizado');
        this.router.navigate(['/sacerdotesGrid']);
      }, error => {
        console.error(error);
      });
    } else {      
      alert('httpOptions no está definido, intente iniciar sesion nuevamente');
    }
  }
}