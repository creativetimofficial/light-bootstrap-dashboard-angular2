import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

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
        if (responseData) {
          this.tableData1.dataRows = responseData.map(item => {
            return {
              id: item.id,
              numDiocesisContacto : item.numDiocesisContacto,
              numDiocesisEclisiastica : item.numDiocesisEclisiastica,
              fechaCreacion: new Date(new Date(item.fechaCreacion).getTime() + 86400000).toLocaleDateString('es-ES', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('-'),
              numDiocesisEstablecidas: item.numDiocesisEstablecidas,
              numDiocesisExpansion: item.numDiocesisExpansion,
              numRegiones: item.numDiocesisExpansion       
            }
          });
        }
        this.data = responseData;
      });
    }
    editRow(row) {
      const elementId = row.id;
      console.log(elementId);
      this.router.navigate(['/editarTercerPilar', elementId]);
      
    }
    public deleteRow(row) {
      const params = { id: row.id };
      console.log(this.httpOptions);
      const token = localStorage.getItem('jwt');
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
      const response = this.http.post(`https://encuentro-matrimonial-backend.herokuapp.com/pilar/tercerPilar/delete?id=${params.id}`, {}, httpOptions);
      
      response.subscribe((result: any) => {
    
        // Actualizar la tabla llamando la función getTableData()
        this.getTableData();
      });
    }
    
    public getTableData() {
      this.http.get('https://encuentro-matrimonial-backend.herokuapp.com/pilar/tercerPilar/getAll', this.httpOptions)
        .subscribe(response => {
          console.log(response); // ver los datos obtenidos en la consola
          const responseData = response['response']; // acceder al array 'response' dentro de la respuesta
          this.tableData1.dataRows = responseData.map(item => {
            return {
              id: item.id,
              numDiocesisContacto : item.numDiocesisContacto,
              numDiocesisEclisiastica : item.numDiocesisEclisiastica,
              fechaCreacion: new Date(new Date(item.fechaCreacion).getTime() + 86400000).toLocaleDateString('es-ES', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('-'),
              numDiocesisEstablecidas: item.numDiocesisEstablecidas,
              numDiocesisExpansion: item.numDiocesisExpansion,
              numRegiones: item.numDiocesisExpansion                
            }
          });
    
          this.data = responseData;
        });
    }
    
      // Función para generar el archivo Excel
generateExcel() {
  // Realizar la consulta y obtener los datos en un arreglo
  this.http.get('https://encuentro-matrimonial-backend.herokuapp.com/pilar/tercerPilar/getAll', this.httpOptions)
  .subscribe(data => {
    const rows = [];

    // Agregar los encabezados como primera fila
    const headers = [
      'ID' ,
      'Número de diócesis de contacto',
      'Número de diócesis eclesiásticas',
      'Fecha de creación',
      'Número de diócesis establecidas',
      'Número de diócesis en expansión',
      'Número de regiones'
    ]
    rows.push(headers);
    console.log(data)
    const responseData = data['response']; // acceder al array 'response' dentro de la respuesta

    responseData.forEach(item => {
      const row = [
        item.id,
        item.numDiocesisContacto,
        item.numDiocesisEclisiastica,
        new Date(item.fechaCreacion).toLocaleDateString('es-ES'),
        item.numDiocesisEstablecidas,
        item.numDiocesisExpansion,
        item.numRegiones  
      ];
      rows.push(row);
    });
    // Crear una nueva hoja de cálculo de Excel
    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    // Crear un libro de Excel y agregar la hoja de cálculo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Convertir el libro de Excel a un archivo binario y descargarlo
    const file = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });
    const blob = new Blob([this.s2ab(file)], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'TercerPilar.xlsx';
    link.click();
  });
}

// Función para convertir una cadena a un arreglo de bytes
s2ab(s: string) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}
}
