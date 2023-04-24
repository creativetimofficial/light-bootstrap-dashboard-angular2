import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nuevoTercerPilar',
  templateUrl: './nuevoTercerPilar.component.html',
  styleUrls: ['./nuevoTercerPilar.component.css']
})
export class NuevoTercerPilarComponent implements OnInit {
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
    const numRegiones = (<HTMLInputElement>document.getElementById('numRegiones')).value;
    const numDiocesisEstablecidas = (<HTMLInputElement>document.getElementById('numDiocesisEstablecidas')).value;
    const numDiocesisContacto = (<HTMLInputElement>document.getElementById('numDiocesisContacto')).value;
    const numDiocesisExpansion = (<HTMLInputElement>document.getElementById('numDiocesisExpansion')).value;
    const numDiocesisEclisiastica = (<HTMLInputElement>document.getElementById('numDiocesisEclisiastica')).value;



    const newTercerPilar = {
      fechaCreacion,
      numRegiones,
      numDiocesisEstablecidas,
      numDiocesisContacto,
      numDiocesisExpansion,
      numDiocesisEclisiastica     
    };

    const jsonSegundoPilar = JSON.stringify(newTercerPilar); // Convertir el objeto en una cadena JSON
    console.log(jsonSegundoPilar);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/pilar/tercerPilar/create', jsonSegundoPilar, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        alert('Tercer pilar creado exitosamente');
        this.router.navigate(['/tercerPilarGrid']);
      }, error => {
        console.error(error);
      });
    } else {
      alert('httpOptions no está definido, intente iniciar sesion nuevamente');
      console.log('httpOptions no está definido');
    }
  }

}
