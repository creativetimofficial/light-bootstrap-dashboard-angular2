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

    this.http.get('https://encuentro-matrimonial-backend.herokuapp.com/user/getUsuarios', this.httpOptions)
    .subscribe(response => {  
      console.log(response); // ver los datos obtenidos en la consola
      const responseData = response['response']; // acceder al array 'response' dentro de la respuesta
  
      this.tableData1.dataRows = responseData.map(item => {
        return {
          id : item.id,
          name : item.name,
          lastname : item.lastname,
          creationDate: item.creationDate.slice(0, 10),
          document: item.document,
          username: item.username        
        }
      });

      this.data = responseData;
    });
  }

  editRow(row) {
    console.log(row);
    const id = row.id;
    this.router.navigate(['/usuariosEditar', id]);
    
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
    const response = this.http.post(`https://encuentro-matrimonial-backend.herokuapp.com/user/deleteUsuario?id=${params.id}`, {}, httpOptions);
    
    response.subscribe((result: any) => {
  
      // Actualizar la tabla llamando la función getTableData()
      this.getTableData();
    });
  }
  
  public getTableData() {
    this.http.get('https://encuentro-matrimonial-backend.herokuapp.com/user/getUsuarios', this.httpOptions)
      .subscribe(response => {
        console.log(response); // ver los datos obtenidos en la consola
        const responseData = response['response']; // acceder al array 'response' dentro de la respuesta
        this.tableData1.dataRows = responseData.map(item => {
          return {
            id : item.id,
            name : item.name,
            lastname : item.lastname,
            creationDate: item.creationDate.slice(0, 10),
            document: item.document,
            username: item.username        
          }
        });
  
        this.data = responseData;
      });
  }
}
