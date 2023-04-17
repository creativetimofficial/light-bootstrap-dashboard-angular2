import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevoPrimerPilar',
  templateUrl: './nuevoPrimerPilar.component.html',
  styleUrls: ['./nuevoPrimerPilar.component.css']
})
export class NuevoPrimerPilarComponent implements OnInit {
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
    const fecha = (document.getElementById("fechaCreacion") as HTMLInputElement).value;
    const fechaObjeto = new Date(fecha);
    const fechaCreacion = fechaObjeto.toISOString();
    const numFDS = (<HTMLInputElement>document.getElementById('numFDS')).value;
    const numMatrinoniosVivieron = (<HTMLInputElement>document.getElementById('numMatrinoniosVivieron')).value;
    const numSacerdotesVivieron = (<HTMLInputElement>document.getElementById('numSacerdotesVivieron')).value;
    const numReligiososVivieron = (<HTMLInputElement>document.getElementById('numReligiososVivieron')).value;
    const numReligiosasVivieron = (<HTMLInputElement>document.getElementById('numReligiosasVivieron')).value;
    const newPrimerPilar = {
      fechaCreacion,
      numFDS,
      numMatrinoniosVivieron,
      numSacerdotesVivieron,
      numReligiososVivieron,
      numReligiosasVivieron
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
}