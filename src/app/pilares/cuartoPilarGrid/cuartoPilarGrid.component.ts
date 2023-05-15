import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDownloadDialogComponent } from 'app/shared/confirm-download-dialog/confirm-download-dialog.component'; 
import { ConfirmDeleteComponent } from 'app/shared/confirm-delete/confirm-delete.component';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-cuartoPilarGrid',
  templateUrl: './cuartoPilarGrid.component.html',
  styleUrls: ['./cuartoPilarGrid.component.css']
})

export class CuartoPilarGridComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;
    data: any; // variable para almacenar los datos obtenidos de la llamada
    httpOptions: any;
    currentPage = 1;
    pageSize = 5; // Tamaño de página deseado
    totalRecords = 20; // Número total de registros
    // Calcula el número total de páginas
    totalPages = Math.ceil(this.totalRecords / this.pageSize);
    // Genera el array de páginas
    pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);

    constructor(private http: HttpClient,  private router: Router, public dialog: MatDialog) { 
      this.tableData1 = { headerRow: [], dataRows: [] };
    }
    ngOnInit() {
        let token = localStorage.getItem('jwt');
        let userId = localStorage.getItem('userId');

        console.log(token);

        this.httpOptions = {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          })
        };



        this.http.get(`https://encuentro-matrimonial-backend.herokuapp.com/pilar/cuartoPilar/getAll?id=${userId}`, this.httpOptions)
        .subscribe(response => {
          console.log(response); // ver los datos obtenidos en la consola
        const responseData = response['response']; // acceder al array 'response' dentro de la respuesta
        
        if (responseData) {

          this.tableData1.dataRows = responseData.slice(0, 5).map(item => {
            return {
            id: item.id,
            numComunidadApoyo : item.numComunidadApoyo,
            numFdsPostPeriodo : item.numFdsPostPeriodo,
            fechaCreacion: new Date(new Date(item.fechaCreacion).getTime() + 86400000).toLocaleDateString('es-ES', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('-'),
            numMatrimoiosComunidad: item.numMatrimoiosComunidad,
            numMatrimonioVivieron: item.numMatrimonioVivieron,
            numSacerdotesComunidad: item.numSacerdotesComunidad,       
            numServiciosComunidad: item.numServiciosComunidad,
            numServidoresPostActivos: item.numServidoresPostActivos,       

          }
        });
        this.data = responseData;
        // Calcular el número total de páginas
        this.totalPages = Math.ceil(this.data.length / this.pageSize);

        // Generar un array con las páginas
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

        // Actualizar los datos de la página actual
        this.setCurrentPage(1);
        }
        });

    }
    setCurrentPage(page: number) {
      this.currentPage = page;
      const start = (page - 1) * 5;
      const end = start + 5;
      this.tableData1.dataRows = this.data.slice(start, end).map(item => {
        return {
          id: item.id,
            numComunidadApoyo : item.numComunidadApoyo,
            numFdsPostPeriodo : item.numFdsPostPeriodo,
            fechaCreacion: new Date(new Date(item.fechaCreacion).getTime() + 86400000).toLocaleDateString('es-ES', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('-'),
            numMatrimoiosComunidad: item.numMatrimoiosComunidad,
            numMatrimonioVivieron: item.numMatrimonioVivieron,
            numSacerdotesComunidad: item.numSacerdotesComunidad,       
            numServiciosComunidad: item.numServiciosComunidad,
            numServidoresPostActivos: item.numServidoresPostActivos,      
        }
      });
    }
    calculatePageData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.tableData1.dataRows = this.data.slice(start, end);
    }
    editRow(row) {
      const elementId = row.id;
      console.log(elementId);
      this.router.navigate(['/editarCuartoPilar', elementId]);
      
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
      const response = this.http.post(`https://encuentro-matrimonial-backend.herokuapp.com/pilar/cuartoPilar/delete?id=${params.id}`, {}, httpOptions);
      
      response.subscribe((result: any) => {
    
        // Actualizar la tabla llamando la función getTableData()
        this.getTableData();
      });
    }
    
    public getTableData() {
      this.http.get('https://encuentro-matrimonial-backend.herokuapp.com/pilar/cuartoPilar/getAll', this.httpOptions)
        .subscribe(response => {
          console.log(response); // ver los datos obtenidos en la consola
          const responseData = response['response']; // acceder al array 'response' dentro de la respuesta
          this.tableData1.dataRows = responseData.map(item => {
            return {
              id: item.id,
              numComunidadApoyo : item.numComunidadApoyo,
              numFdsPostPeriodo : item.numFdsPostPeriodo,
              fechaCreacion: new Date(new Date(item.fechaCreacion).getTime() + 86400000).toLocaleDateString('es-ES', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('-'),
              numMatrimoiosComunidad: item.numMatrimoiosComunidad,
              numMatrimonioVivieron: item.numMatrimonioVivieron,
              numSacerdotesComunidad: item.numSacerdotesComunidad,       
              numServiciosComunidad: item.numServiciosComunidad,
              numServidoresPostActivos: item.numServidoresPostActivos,      
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

    generateExcel(){
      // Realizar la consulta y obtener los datos en un arreglo
      this.http.get('https://encuentro-matrimonial-backend.herokuapp.com/pilar/segundoPilar/getAll', this.httpOptions)
      .subscribe(data => {
        const rows = [];
    
        // Agregar los encabezados como primera fila
        const headers = [
          'Fecha de Creación',
          'Num. Servidores Post Activos',
          'Num. FDS Post Periodo',
          'Num. Matrimonios Vivieron',
          'Num. Comunidad Apoyo', 
          'Num. Servicios Comunidad',     
          'Num. Matrimonios Comunidad',
          'Num. Sacerdotes Comunidad',
          'Num. Religiosos Comunidad'
        ];
    
        rows.push(headers);
        console.log(data)
        const responseData = data['response']; // acceder al array 'response' dentro de la respuesta
    
        responseData.forEach(item => {
          const row = [
            item.id,
            new Date(item.fechaCreacion).toLocaleDateString('es-ES'),
            item.numServidoresPostActivos,
            item.numFdsPostPeriodo,
            item.numMatrimonioVivieron,
            item.numComunidadApoyo, 
            item.numServiciosComunidad,     
            item.numMatrimoiosComunidad,
            item.numSacerdotesComunidad,
            item.numReligiososComunidad
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
        link.download = 'CuartoPilar.xlsx';
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
            numComunidadApoyo : item.numComunidadApoyo,
            numFdsPostPeriodo : item.numFdsPostPeriodo,
            fechaCreacion: fechaCreacion
            .toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
            .split('/')
            .join('-'),            numMatrimoiosComunidad: item.numMatrimoiosComunidad,
            numMatrimonioVivieron: item.numMatrimonioVivieron,
            numSacerdotesComunidad: item.numSacerdotesComunidad,       
            numServiciosComunidad: item.numServiciosComunidad,
            numServidoresPostActivos: item.numServidoresPostActivos, 
           
           
        
          };
        });
      }
  } 


