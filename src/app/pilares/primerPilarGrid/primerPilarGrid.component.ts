import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDownloadDialogComponent } from 'app/shared/confirm-download-dialog/confirm-download-dialog.component'; 
import { ConfirmDeleteComponent } from 'app/shared/confirm-delete/confirm-delete.component';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-primerPilarGrid',
  templateUrl: './primerPilarGrid.component.html',
  styleUrls: ['./primerPilarGrid.component.css'],
})

export class PrimerPilarGridComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;
    data: any; // variable para almacenar los datos obtenidos de la llamada
    @ViewChild('row') row: any;
    httpOptions: any;
    token: any;
    response: any;

    currentPage = 1;
    pageSize = 5; // Tamaño de página deseado
    totalRecords = 20; // Número total de registros

    // Calcula el número total de páginas
    totalPages = Math.ceil(this.totalRecords / this.pageSize);

    // Genera el array de páginas
    pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);


    constructor(private http: HttpClient,  private router: Router, public dialog: MatDialog) { 
        this.tableData1 = { headerRow: [], dataRows: [] };
        this.tableData2 = { headerRow: [], dataRows: [] };

    }

  ngOnInit() {
    let token = localStorage.getItem('jwt');
    let userId = localStorage.getItem('userId');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    console.log(userId);
    this.http.get(`https://encuentro-matrimonial-backend.herokuapp.com/pilar/primerPilar/getAll?id=${userId}`, this.httpOptions)
    .subscribe(response => {
      console.log(response); // ver los datos obtenidos en la consola
      const responseData = response['response']; // acceder al array 'response' dentro de la respuesta
      this.tableData1.dataRows = responseData.slice(0, 5).map(item => {
          return { 
          id: item.id,
          numFDS : item.numFDS,
          numMatrinoniosVivieron : item.numMatrinoniosVivieron,
          fechaCreacion: new Date(new Date(item.fechaCreacion).getTime() + 86400000).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').join('-'),
          numSacerdotesVivieron: item.numSacerdotesVivieron,
          numReligiososVivieron: item.numReligiososVivieron,
                
        }
      });   

      const responseData2 = response['totalResponse']; // acceder al array 'response' dentro de la respuesta
      this.tableData2.dataRows = responseData2.slice(0, 5).map(item => {
          return { 
          key: item.key,
          value : item.value,                
        }
      });  
         
      this.data = responseData;
      // Calcular el número total de páginas
      this.totalPages = Math.ceil(this.data.length / this.pageSize);

      // Generar un array con las páginas
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

      // Actualizar los datos de la página actual
      this.setCurrentPage(1);
    });
    
   
  }
  setCurrentPage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * 5;
    const end = start + 5;
    this.tableData1.dataRows = this.data.slice(start, end).map(item => {
      return {
        id: item.id,
        numFDS : item.numFDS,
        numMatrinoniosVivieron : item.numMatrinoniosVivieron,
        fechaCreacion: new Date(new Date(item.fechaCreacion).getTime() + 86400000).toLocaleDateString('es-ES', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('-'),
        numSacerdotesVivieron: item.numSacerdotesVivieron,
        numReligiososVivieron: item.numReligiososVivieron        
      }
    });
  }
  calculatePageData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.tableData1.dataRows = this.data.slice(start, end);
  }

  openDialogDelete(row):void{
    const dialogRef = this.dialog.open(ConfirmDeleteComponent,{
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if(res){
        this.deleteRow(row);
      }
    })
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
    const response = this.http.post(`https://encuentro-matrimonial-backend.herokuapp.com/pilar/primerPilar/delete?id=${params.id}`, {}, httpOptions);
    
    response.subscribe((result: any) => {
  
      // Actualizar la tabla llamando la función getTableData()
      this.getTableData();
      this.setCurrentPage(1);

    });
  }


  editRow(row) {
    const elementId = row.id;
    console.log(elementId);
    this.router.navigate(['/editarPrimerPilar', elementId]);
    
  }

  public getTableData() {
    let userId = localStorage.getItem('userId');
    this.http.get(`https://encuentro-matrimonial-backend.herokuapp.com/pilar/primerPilar/getAll?id=${userId}`, this.httpOptions)
      .subscribe(response => {
        console.log(response); // ver los datos obtenidos en la consola
        const responseData = response['response']; // acceder al array 'response' dentro de la respuesta
        this.tableData1.dataRows = responseData.map(item => {
          return {
            id: item.id,
            numFDS : item.numFDS,
            numMatrinoniosVivieron : item.numMatrinoniosVivieron,
            fechaCreacion: new Date(new Date(item.fechaCreacion).getTime() + 86400000).toLocaleDateString('es-ES', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('-'),
            numSacerdotesVivieron: item.numSacerdotesVivieron,
            numReligiososVivieron: item.numReligiososVivieron        
          }
        });
  
        this.data = responseData;
      });
  }
  
  openDialog():void{
    const dialogRef = this.dialog.open(ConfirmDownloadDialogComponent,{
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if(res){
        this.generateExcel();
      }
    })
  }
 
  // Función para generar el archivo Excel
  generateExcel() {
    let userId = localStorage.getItem('userId');

    // Realizar la consulta y obtener los datos en un arreglo
    this.http.get(`https://encuentro-matrimonial-backend.herokuapp.com/pilar/primerPilar/getAll?id=${userId}`, this.httpOptions)
    .subscribe(data => {
      const rows = [];

      // Agregar los encabezados como primera fila
      const headers = ['ID', 'Fecha de Creación', 'Num. FDS', 'Num. Matrimonios Vivieron', 'Num. Sacerdotes Vivieron', 'Num. Religiosos/as Vivieron'];
      rows.push(headers);
      console.log(data)
      const responseData = data['response']; // acceder al array 'response' dentro de la respuesta

      responseData.forEach(item => {
        const row = [
          item.id,
          new Date(item.fechaCreacion).toLocaleDateString('es-ES'),
          item.numFDS,
          item.numMatrinoniosVivieron,
          item.numSacerdotesVivieron,
          item.numReligiososVivieron  
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
      link.download = 'Primer Pilar.xlsx';
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
  filterByDate(selectedDate: string) {
    const selectedDateObj = new Date(selectedDate);
    const selectedYear = selectedDateObj.getFullYear();
    const selectedMonth = selectedDateObj.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
    const selectedDay = selectedDateObj.getDate();
  
    const filteredData = this.data.filter(item => {
      const itemDate = new Date(item.fechaCreacion);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
      const itemDay = itemDate.getDate();
  
      return itemYear === selectedYear && itemMonth === selectedMonth && itemDay === selectedDay;
    });
  
    this.totalPages = Math.ceil(filteredData.length / this.pageSize); // Actualizar el número total de páginas
  
    // Verificar si la página actual es mayor al nuevo número total de páginas y ajustarla si es necesario
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
  
    this.tableData1.dataRows = filteredData.slice(start, end).map(item => {
      const fechaCreacion = new Date(item.fechaCreacion);
      fechaCreacion.setDate(fechaCreacion.getDate() + 1);
  
      return {
        id: item.id,
        numFDS: item.numFDS,
        numMatrinoniosVivieron: item.numMatrinoniosVivieron,
        fechaCreacion: fechaCreacion
          .toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
          .split('/')
          .join('-'),
        numSacerdotesVivieron: item.numSacerdotesVivieron,
        numReligiososVivieron: item.numReligiososVivieron,
        isVisible: true
      };
    });
  }
  
}