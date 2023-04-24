import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-segundoPilarGrid',
  templateUrl: './segundoPilarGrid.component.html',
  styleUrls: ['./segundoPilarGrid.component.css']
})

export class SegundoPilarGridComponent implements OnInit {
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



    this.http.get('https://encuentro-matrimonial-backend.herokuapp.com/pilar/segundoPilar/getAll', this.httpOptions)
    .subscribe(response => {
      console.log(response); // ver los datos obtenidos en la consola
      const responseData = response['response']; // acceder al array 'response' dentro de la respuesta
      this.tableData1.dataRows = responseData.map(item => {
        const formattedDate = new Date(item.fechaCreacion).toLocaleDateString('es-ES');
        const rowValues = Object.values(item);
        rowValues[1] = formattedDate;
        return rowValues;
      });
    });
  }
  editRow(index: number) {
    // Obtener el ID del elemento que se está editando desde el arreglo de datos
    const elementId = this.tableData1.dataRows[index][0];
    console.log(elementId);
    // Navegar a la página de edición del primer pilar, pasando el ID como parámetro
    this.router.navigate(['/editarSegundoPilar', elementId]);
  }
  generateExcel(){
  // Realizar la consulta y obtener los datos en un arreglo
  this.http.get('https://encuentro-matrimonial-backend.herokuapp.com/pilar/segundoPilar/getAll', this.httpOptions)
  .subscribe(data => {
    const rows = [];

    // Agregar los encabezados como primera fila
    const headers = [
      'ID',
      'Fecha de Creación',
      'Num. Matrimos Servidores Activos',
      'Num. Sacerdotes Servidores Activos',
      'Num. Matrimos Servidores Profundo Activos',
      'Num. Sacerdotes Servidores Profundo Activos',
      'Num. FDS Profundos en el Periodo',
      'Num. Matrimos Vivieron Profundo',
      'Num. Sacerdotes Vivieron Profundo',
      'Num. Matrimos Debutaron Profundo',
      'Num. Sacerdotes Debutaron Profundo'
    ];

    rows.push(headers);
    console.log(data)
    const responseData = data['response']; // acceder al array 'response' dentro de la respuesta

    responseData.forEach(item => {
      const row = [
        item.id,
        new Date(item.fechaCreacion).toLocaleDateString('es-ES'),
        item.numMatrimosServidoresActivos,
        item.numSacerdotesServidoresActivos,
        item.numMatrimosServidoresProfundoActivos,
        item.numSacerdotesServidoresprofundoActivos,
        item.numFdsProfundosPeriodo,
        item.numMatrimosVivieronProfundo,
        item.numSacerdotesVivieronProfundo,
        item.numMatrimosDebutaronProfundo,
        item.numSacerdotesDebutaronProfundo,
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
    link.download = 'SegundoPilar.xlsx';
    link.click();
  })
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
