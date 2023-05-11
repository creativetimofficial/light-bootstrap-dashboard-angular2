  import { Component, OnInit } from '@angular/core';

  @Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
  })
  export class PaginationComponent implements OnInit {

    data: any; // variable para almacenar los datos obtenidos de la llamada
    httpOptions: any;
    token: any;
    response: any;
    currentPage = 1;
    pageSize = 5;
    totalPages: number;
    pages: number[];
    tableData1: any;

    constructor() { }

    ngOnInit(): void {
       // Calcular el número total de páginas
    this.totalPages = Math.ceil(this.data.length / this.pageSize);

    // Generar un array con las páginas
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    // Actualizar los datos de la página actual
    this.calculatePageData();
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
  }
