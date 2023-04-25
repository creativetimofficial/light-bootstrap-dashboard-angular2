import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nuevoSacerdote',
  templateUrl: './nuevoSacerdote.component.html',
  styleUrls: ['./nuevoSacerdote.component.css']
})
export class NuevoSacerdoteComponent implements OnInit {

  httpOptions: any;
  token: any;
  ciudades: any[]; // Declarar la propiedad 'ciudades'
  paises: any[]; // Declarar la propiedad 'paises'
  selectedCiudad: string;
  selectedPais: string;
  constructor(private http: HttpClient, private router: Router) {}

  
 ngOnInit() {
    let token = localStorage.getItem('jwt');
    console.log(token);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
    // Obtener los datos del país
  this.obtenerDatosPais().subscribe((data) => {
    // Obtener la respuesta del JSON
    const response = data.response;
    // Obtener el select del HTML
    const selectPais = document.getElementById('select-pais') as HTMLSelectElement;

    // Crear un option por cada país en la respuesta del JSON
    response.forEach((pais: any) => {
      const option = document.createElement('option');
      option.value = pais.id;
      option.text = pais.name;
      selectPais.appendChild(option);
    });
  });
  }

  newSacerdote() {
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



    const sacerdote = {
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

    const jsonSacerdote = JSON.stringify(sacerdote); // Convertir el objeto en una cadena JSON
    console.log(jsonSacerdote);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/formacion/sacerdote/create', jsonSacerdote, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        alert('Registro creado exitosamente');
        this.router.navigate(['/sacerdotesGrid']);
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
