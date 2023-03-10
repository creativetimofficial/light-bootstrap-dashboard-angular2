import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
      this.tableData1 = {
          headerRow: [ 'Fecha', '#Serv. Post-Encuentro activos', '#FDS Serv. Post-Encuentro P.', '#Matrim. Vivi. Serv. Post-Encuentro', '#Comuni. de apoyo', '#Serv. Comunid.', '#Matrim. Asis. Comunid'],
          dataRows: [
              ['00/0000', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem'],
              ['00/0000', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem'],
              ['00/0000', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem'],
              ['00/0000', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem'],
              ['00/0000', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem'],
              ['00/0000', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem'],
              ['00/0000', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem'],
              ['00/0000', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem', 'Lorem']


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
