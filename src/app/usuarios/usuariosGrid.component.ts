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
    console.log(id + "este");
    this.router.navigate(['/usuariosEditar', id]);
    
  }
}
