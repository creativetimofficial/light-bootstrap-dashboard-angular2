import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
      this.tableData1 = {
          headerRow: [ 'Fecha', '#Regiones', '#Diócesis Establecidas', '#Diócesis de Contacto', '#Diócesis de Expansion'],
          dataRows: [
              ['00/0000', '1', '1', '1', '2'],
              ['00/0000', '2', '2', '3', '3'],
              ['00/0000', '3', '3', '4', '4'],
              ['00/0000', '4', '5', '2', '5'],
              ['00/0000', '1', '3', '1', '3'],
              ['00/0000', '3', '1', '3', '4'],
              ['00/0000', '4', '1', '1', '5'],
              ['00/0000', '5', '3', '2', '1']


          ]
      };
      this.tableData2 = {
          headerRow: [ 'ID', 'Name',  'Salary', 'Country', 'City' ],
          dataRows: [
              ['1', 'Dakota Rice','$36,738', 'Niger', 'Oud-Turnhout' ],
              ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
              ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
              ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
              ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
              ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
          ]
      };
  }

}
