import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'app/shared/confirm-dialog/confirm-dialog.component'; 

@Component({
  selector: 'app-nuevoCuartoPilar',
  templateUrl: './nuevoCuartoPilar.component.html',
  styleUrls: ['./nuevoCuartoPilar.component.css']
})
export class NuevoCuartoPilarComponent implements OnInit {

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
    const fecha = (document.getElementById("fecha") as HTMLInputElement).value;
    const fechaObjeto = new Date(fecha);
    const fechaCreacion = fechaObjeto.toISOString();
    const numServidoresPostActivos = (<HTMLInputElement>document.getElementById('numServidoresPostActivos')).value;
    const numFdsPostPeriodo = (<HTMLInputElement>document.getElementById('numFdsPostPeriodo')).value;
    const numMatrimonioVivieron = (<HTMLInputElement>document.getElementById('numMatrimonioVivieron')).value;
    const numComunidadApoyo = (<HTMLInputElement>document.getElementById('numComunidadApoyo')).value;
    const numServiciosComunidad = (<HTMLInputElement>document.getElementById('numServiciosComunidad')).value;
    const numMatrimoiosComunidad = (<HTMLInputElement>document.getElementById('numMatrimoiosComunidad')).value;
    const numSacerdotesComunidad = (<HTMLInputElement>document.getElementById('numSacerdotesComunidad')).value;
    const numReligiososComunidad = (<HTMLInputElement>document.getElementById('numReligiososComunidad')).value;
    const ciudadSeleccionada = (<HTMLInputElement>document.getElementById('select-ciudad')).value;

    const jsonCuartoPilar = {
      fechaCreacion,
      numServidoresPostActivos,
      numFdsPostPeriodo,
      numMatrimonioVivieron,
      numComunidadApoyo, 
      numServiciosComunidad,     
      numMatrimoiosComunidad,
      numSacerdotesComunidad,
      numReligiososComunidad,
      ciudad: {
        id: ciudadSeleccionada
      }, 
    };

    const jsonSegundoPilar = JSON.stringify(jsonCuartoPilar); // Convertir el objeto en una cadena JSON
    console.log(jsonSegundoPilar);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/pilar/cuartoPilar/create', jsonSegundoPilar, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        alert('Cuarto pilar creado exitosamente');
        this.router.navigate(['/cuartoPilarGrid']);
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
