import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevoCuartoPilar',
  templateUrl: './nuevoCuartoPilar.component.html',
  styleUrls: ['./nuevoCuartoPilar.component.css']
})
export class NuevoCuartoPilarComponent implements OnInit {

  httpOptions: any;
  token: any;
  
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

    const jsonCuartoPilar = {
      fechaCreacion,
      numServidoresPostActivos,
      numFdsPostPeriodo,
      numMatrimonioVivieron,
      numComunidadApoyo, 
      numServiciosComunidad,     
      numMatrimoiosComunidad,
      numSacerdotesComunidad,
      numReligiososComunidad
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

}
