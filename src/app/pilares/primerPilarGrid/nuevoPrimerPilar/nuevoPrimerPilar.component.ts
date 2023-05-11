import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component'; 

@Component({
  selector: 'app-nuevoPrimerPilar',
  templateUrl: './nuevoPrimerPilar.component.html',
  styleUrls: ['./nuevoPrimerPilar.component.css']
})
export class NuevoPrimerPilarComponent implements OnInit {

  httpOptions: any;
  token: any;
  ciudades: any[]; // Declarar la propiedad 'ciudades'
  paises: any[]; // Declarar la propiedad 'paises'
  selectedCiudad: string;
  selectedPais: string;

  constructor(private http: HttpClient, private router: Router, public dialog: MatDialog) {}

  

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

  openDialog():void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: "¿Estás seguro que la informacion ingresada es correcta?"
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if(res){
        this.newPilar();
      }
    })
  }

  newPilar() {
    const fecha = (document.getElementById("fechaCreacion") as HTMLInputElement).value;
    const fechaObjeto = new Date(fecha);
    const fechaCreacion = fechaObjeto.toISOString();
    const numFDS = (<HTMLInputElement>document.getElementById('numFDS')).value;
    const numMatrinoniosVivieron = (<HTMLInputElement>document.getElementById('numMatrinoniosVivieron')).value;
    const numSacerdotesVivieron = (<HTMLInputElement>document.getElementById('numSacerdotesVivieron')).value;
    const numReligiososVivieron = (<HTMLInputElement>document.getElementById('numReligiososVivieron')).value;
    const ciudadSeleccionada = (<HTMLInputElement>document.getElementById('select-ciudad')).value;

    const newPrimerPilar = {
      fechaCreacion,
      numFDS,
      numMatrinoniosVivieron,
      numSacerdotesVivieron,
      numReligiososVivieron,
      ciudadSeleccionada,
      ciudad: {
        id: ciudadSeleccionada
      },
    };
    const jsonPrimerPilar = JSON.stringify(newPrimerPilar); // Convertir el objeto en una cadena JSON
    console.log(jsonPrimerPilar);
    console.log(this.httpOptions);
    
    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/pilar/primerPilar/create', jsonPrimerPilar, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        alert('Primel pilar creado exitosamente');
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