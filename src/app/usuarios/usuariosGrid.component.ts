import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDownloadDialogComponent } from 'app/shared/confirm-download-dialog/confirm-download-dialog.component'; 
import { ConfirmDeleteComponent } from 'app/shared/confirm-delete/confirm-delete.component';

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
    pageSize = 5; // Tamaño de página deseado
    totalRecords = 20; // Número total de registros
    // Calcula el número total de páginas
    totalPages = Math.ceil(this.totalRecords / this.pageSize);
    // Genera el array de páginas
    pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    currentPage = 1;
    searchText= "";

    constructor(private http: HttpClient,  private router: Router, public dialog: MatDialog) { 
        this.tableData1 = { headerRow: [], dataRows: [] };
    }

  ngOnInit() {
    let token = localStorage.getItem('jwt');
    let userId = localStorage.getItem('userId');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    this.http.get(`https://encuentro-matrimonial-backend.herokuapp.com/user/getUsuarios?id=${userId}`, this.httpOptions)
    .subscribe(response => {  
      const responseData = response['response']; // acceder al array 'response' dentro de la respuesta
  
      this.tableData1.dataRows = responseData.slice(0, 5).map(item => {
        const currentDate = new Date(item.creationDate);
        currentDate.setDate(currentDate.getDate() - 1);
        const modifiedCreationDate = currentDate.toISOString();
        return {
          id : item.id,
          name : item.name,
          document : item.document,
          ciudad: item.ciudad.name,
          pais: item.ciudad.pais.name         
        }
      });
      console.log(this.tableData1.dataRows);
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
      const currentDate = new Date(item.creationDate);
      currentDate.setDate(currentDate.getDate() - 1);
      const modifiedCreationDate = currentDate.toISOString();
      return {
        id : item.id,
        name : item.name,
        document : item.document,
        ciudad: item.ciudad.name,
        pais: item.ciudad.pais.name      
      }
    });
  }
  calculatePageData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.tableData1.dataRows = this.data.slice(start, end);
  }
  editRow(row) {
    const id = row.id;
    this.router.navigate(['/usuariosEditar', id]);
    
  }
  openDialogDelete(row):void{
    const dialogRef = this.dialog.open(ConfirmDeleteComponent,{
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.deleteRow(row);
      }
    })
  }
  public deleteRow(row) {
    const params = { id: row.id };
    const token = localStorage.getItem('jwt');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    const response = this.http.post(`https://encuentro-matrimonial-backend.herokuapp.com/user/deleteUsuario?id=${params.id}`, {}, httpOptions);
    
    response.subscribe((result: any) => {
        this.setCurrentPage(1);
        this.getTableData();
    });
  }
  
  public getTableData() {
    let userId = localStorage.getItem('userId');

    this.http.get(`https://encuentro-matrimonial-backend.herokuapp.com/user/getUsuarios?id=${userId}`, this.httpOptions)
      .subscribe(response => {
        const responseData = response['response']; // acceder al array 'response' dentro de la respuesta
        this.tableData1.dataRows = responseData.map(item => {
          return {
            id : item.id,
            name : item.name,
            document : item.document,
            ciudad: item.ciudad.name,
            pais: item.ciudad.pais.name
          }
        });
  
        this.data = responseData;
      });
  }
  filterByUsername(searchText: string) {
    this.searchText = searchText.trim().toLowerCase();
  
    if (this.searchText === '') {
      // Si el campo de búsqueda está vacío, mostrar todos los resultados
      this.tableData1.dataRows = this.data.map(item => ({
        id : item.id,
        name : item.name,
        document : item.document,
        ciudad: item.ciudad.name,
        pais: item.ciudad.pais.name
      }));
    } else {
      // Realizar la búsqueda por username y filtrar los resultados
      this.tableData1.dataRows = this.data.filter(item =>
        item.name.toLowerCase().includes(this.searchText)
      ).map(item => ({
        id : item.id,
        name : item.name,
        document : item.document,
        ciudad: item.ciudad.name,
        pais: item.ciudad.pais.name
      }));
    }
  }
}
