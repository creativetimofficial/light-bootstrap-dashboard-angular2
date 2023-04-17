import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-usuariosGrid',
  templateUrl: './usuariosGrid.component.html',
  styleUrls: ['./usuariosGrid.component.css'],
})

export class UsuariosGridComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;
    data: any; // variable para almacenar los datos obtenidos de la llamada
    httpOptions: any;
    
    constructor(private http: HttpClient,  private router: Router) { 
        this.tableData1 = { headerRow: [], dataRows: [] };
    }

  ngOnInit() {
    let token = localStorage.getItem('jwt');
    console.log(token);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    this.http.get('https://encuentro-matrimonial-backend.herokuapp.com/pilar/primerPilar/getAll', this.httpOptions)
    .subscribe(response => {
      console.log(response); // ver los datos obtenidos en la consola
      const responseData = response['response']; // acceder al array 'response' dentro de la respuesta
      this.tableData1.dataRows = responseData.map(item => Object.values(item)); // almacenar los datos en la variable 'tableData1'
      this.data = responseData; // almacenar los datos en la variable 'data'
    });
  }

  editRow(index: number) {
    // Obtener el ID del elemento que se está editando desde el arreglo de datos
    const elementId = this.tableData1.dataRows[index][0];
    console.log(elementId);
    // Navegar a la página de edición del primer pilar, pasando el ID como parámetro
    this.router.navigate(['/editarPrimerPilar', elementId]);
  }
  
}
