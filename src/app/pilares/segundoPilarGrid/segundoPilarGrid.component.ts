import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
      this.tableData1 = {
          headerRow: [ 'Fecha', '#Matrim. FdS Activo', '#Sacer. FdS Activo', '#Matrim. FdSP Activo', '#Sacer. FdSP Activo', '#FdSP', '#Matrim. Vivi FdSP', '#Sacer. Vivi FdSP', '#Matrim. Debut. Después FdSP', '#Sacer. Debut. Después FdSP'],
          dataRows: [
              ['00/0000', '110', '1', '110', '1', '2', '110', '110', '110', '110'],
              ['00/0000', '210', '2', '210', '3', '3', '210', '210', '210', '210'],
              ['00/0000', '410', '3', '410', '4', '4', '410', '410', '410', '410'],
              ['00/0000', '500', '4', '500', '2', '5', '500', '500', '500', '500'],
              ['00/0000', '610', '1', '610', '1', '3', '610', '610', '610', '610'],
              ['00/0000', '810', '3', '810', '3', '4', '810', '810', '810', '810'],
              ['00/0000', '910', '4', '910', '1', '5', '910', '910', '910', '910'],
              ['00/0000', '718', '5', '718', '2', '1', '718', '718', '718', '718']


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
