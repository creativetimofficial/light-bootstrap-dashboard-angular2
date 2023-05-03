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
  ciudades: any[]; // Declarar la propiedad 'ciudades'
  paises: any[]; // Declarar la propiedad 'paises'
  selectedCiudad: string;
  selectedPais: string;
  data: any;
  pais: any; // cambia a tipo any
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
      // Asignar los datos del elemento al formulario utilizando setValue()
   
      let fecha = new Date(data.response.fechaCreacion);
      let fechaFormateada = fecha.toISOString().substring(0, 10);
      this.editarSegundoPilarForm.controls['fechaCreacion'].setValue(fechaFormateada);
      this.editarSegundoPilarForm.controls['numMatrimosServidoresActivos'].setValue(data.response.numMatrimosServidoresActivos);
      this.editarSegundoPilarForm.controls['numSacerdotesServidoresActivos'].setValue(data.response.numSacerdotesServidoresActivos);
      this.editarSegundoPilarForm.controls['numMatrimosServidoresProfundoActivos'].setValue(data.response.numMatrimosServidoresProfundoActivos);
      this.editarSegundoPilarForm.controls['numSacerdotesServidoresprofundoActivos'].setValue(data.response.numSacerdotesServidoresprofundoActivos);
      this.editarSegundoPilarForm.controls['numFdsProfundosPeriodo'].setValue(data.response.numFdsProfundosPeriodo);
      this.editarSegundoPilarForm.controls['numMatrimosVivieronProfundo'].setValue(data.response.numMatrimosVivieronProfundo);
      this.editarSegundoPilarForm.controls['numSacerdotesVivieronProfundo'].setValue(data.response.numSacerdotesVivieronProfundo);
      this.editarSegundoPilarForm.controls['numMatrimosDebutaronProfundo'].setValue(data.response.numMatrimosDebutaronProfundo);
      this.editarSegundoPilarForm.controls['numSacerdotesDebutaronProfundo'].setValue(data.response.numSacerdotesDebutaronProfundo);
      const pais = data.response.ciudad.pais;
      const ciudad = data.response.ciudad;
      
      console.log(pais.id)
      this.editarSegundoPilarForm.controls['select-pais'].setValue(pais.id);

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
        this.editarSegundoPilarForm.controls['select-pais'].setValue(pais.id);
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
        this.editarSegundoPilarForm.controls['select-ciudad'].setValue(ciudad.id);
      });

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
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const fecha = (document.getElementById("fechaCreacion") as HTMLInputElement).value;
    const fechaObjeto = new Date(fecha);
    const fechaCreacion = fechaObjeto.toISOString();
    const numMatrimosServidoresActivos = (<HTMLInputElement>document.getElementById('numMatrimosServidoresActivos')).value;
    const numSacerdotesServidoresActivos = (<HTMLInputElement>document.getElementById('numSacerdotesServidoresActivos')).value;
    const numMatrimosServidoresProfundoActivos = (<HTMLInputElement>document.getElementById('numMatrimosServidoresProfundoActivos')).value;
    const numSacerdotesServidoresprofundoActivos = (<HTMLInputElement>document.getElementById('numSacerdotesServidoresprofundoActivos')).value;
    const numFdsProfundosPeriodo = (<HTMLInputElement>document.getElementById('numFdsProfundosPeriodo')).value;
    const numMatrimosVivieronProfundo = (<HTMLInputElement>document.getElementById('numMatrimosVivieronProfundo')).value;
    const numSacerdotesVivieronProfundo = (<HTMLInputElement>document.getElementById('numSacerdotesVivieronProfundo')).value;
    const numMatrimosDebutaronProfundo = (<HTMLInputElement>document.getElementById('numMatrimosDebutaronProfundo')).value;
    const numSacerdotesDebutaronProfundo = (<HTMLInputElement>document.getElementById('numSacerdotesDebutaronProfundo')).value;
    const ciudadSeleccionada = (<HTMLInputElement>document.getElementById('select-ciudad')).value;


    const newSegundoPilar = {
      id,
      fechaCreacion,
      numMatrimosServidoresActivos,
      numSacerdotesServidoresActivos,
      numMatrimosServidoresProfundoActivos,
      numSacerdotesServidoresprofundoActivos,
      numFdsProfundosPeriodo,
      numMatrimosVivieronProfundo,
      numSacerdotesVivieronProfundo,
      numMatrimosDebutaronProfundo,
      numSacerdotesDebutaronProfundo,
      ciudad: {
        id: ciudadSeleccionada
      },
    };

    const jsonSegundoPilar = JSON.stringify(newSegundoPilar); // Convertir el objeto en una cadena JSON
    console.log(jsonSegundoPilar);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/pilar/segundoPilar/create', jsonSegundoPilar, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        alert('Pilar Actualizado');
        this.router.navigate(['/segundoPilarGrid']);
      }, error => {
        console.error(error);
      });
    } else {
      alert('httpOptions no está definido, intente iniciar sesion nuevamente');
      console.log('httpOptions no está definido');
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
      this.editarSegundoPilarForm.controls['select-ciudad'].reset(); 
      
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