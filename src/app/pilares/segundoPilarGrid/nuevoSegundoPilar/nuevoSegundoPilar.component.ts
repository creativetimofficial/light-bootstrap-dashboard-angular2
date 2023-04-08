import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevoSegundoPilar',
  templateUrl: './nuevoSegundoPilar.component.html',
  styleUrls: ['./nuevoSegundoPilar.component.css']
})
export class NuevoSegundoPilarComponent implements OnInit {

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
    const numMatrimosServidoresActivos = (<HTMLInputElement>document.getElementById('MatrimoniosServidores')).value;
    const numSacerdotesServidoresActivos = (<HTMLInputElement>document.getElementById('SacerdotesServidores')).value;
    const numMatrimosServidoresProfundoActivos = (<HTMLInputElement>document.getElementById('MatrimoniosProfundosServidores')).value;
    const numSacerdotesServidoresprofundoActivos = (<HTMLInputElement>document.getElementById('SacerdotesProfundosServidores')).value;
    const numFdsProfundosPeriodo = (<HTMLInputElement>document.getElementById('FdSProfundosPeriodo')).value;
    const numMatrimosVivieronProfundo = (<HTMLInputElement>document.getElementById('MatrimoniosProfundosVividos')).value;
    const numSacerdotesVivieronProfundo = (<HTMLInputElement>document.getElementById('SacerdotesProfundosVividos')).value;
    const numMatrimosDebutaronProfundo = (<HTMLInputElement>document.getElementById('MatrimoniosProfundosDebutados')).value;
    const numSacerdotesDebutaronProfundo = (<HTMLInputElement>document.getElementById('SacerdotesProfundosDebutados')).value;


    const newSegundoPilar = {
      fechaCreacion,
      numMatrimosServidoresActivos,
      numSacerdotesServidoresActivos,
      numMatrimosServidoresProfundoActivos,
      numSacerdotesServidoresprofundoActivos,
      numFdsProfundosPeriodo,
      numMatrimosVivieronProfundo,
      numSacerdotesVivieronProfundo,
      numMatrimosDebutaronProfundo,
      numSacerdotesDebutaronProfundo
    };

    const jsonSegundoPilar = JSON.stringify(newSegundoPilar); // Convertir el objeto en una cadena JSON
    console.log(jsonSegundoPilar);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/pilar/segundoPilar/create', jsonSegundoPilar, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        alert('Segundo pilar creado exitosamente');
        this.router.navigate(['/segundoPilarGrid']);
      }, error => {
        console.error(error);
      });
    } else {
      alert('httpOptions no está definido, intente iniciar sesion nuevamente');
      console.log('httpOptions no está definido');
    }
  }

}
