import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-tercerPilarGrid',
  templateUrl: './tercerPilarGrid.component.html',
  styleUrls: ['./tercerPilarGrid.component.css']
})

export class TercerPilarGridComponent implements OnInit {
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



      this.http.get('https://encuentro-matrimonial-backend.herokuapp.com/pilar/tercerPilar/getAll', this.httpOptions)
      .subscribe(response => {
        console.log(response); // ver los datos obtenidos en la consola
        const responseData = response['response']; // acceder al array 'response' dentro de la respuesta
        this.tableData1.dataRows = responseData.map(item => {
          return {
            id: item.id,
            numDiocesisContacto : item.numDiocesisContacto,
            numDiocesisEclisiastica : item.numDiocesisEclisiastica,
            fechaCreacion:  new Date(item.fechaCreacion).toLocaleDateString('es-ES'),
            numDiocesisEstablecidas: item.numDiocesisEstablecidas,
            numDiocesisExpansion: item.numDiocesisExpansion,
            numRegiones: item.numDiocesisExpansion       
          }
        });
  
        this.data = responseData;
      });
    }
    editRow(row) {
      const elementId = row.id;
      console.log(elementId);
      this.router.navigate(['/editarTercerPilar', elementId]);
      
    }
}
