import { Component, OnInit } from '@angular/core';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']  

})
export class TablesComponent implements OnInit {
    public tableData1: TableData;
    public tableData2: TableData;

  constructor() { }

  ngOnInit() {
      this.tableData1 = {
          headerRow: [ 'Fecha', '#FDS', '#Matrimonios', '#Sacerdotes', '#Religiosos', '#Religiosas'],
          dataRows: [
              ['00/0000', '110', '1', '1', '1', '2'],
              ['00/0000', '210', '2', '2', '3', '3'],
              ['00/0000', '410', '3', '3', '4', '4'],
              ['00/0000', '500', '4', '5', '2', '5'],
              ['00/0000', '610', '1', '3', '1', '3'],
              ['00/0000', '810', '3', '1', '3', '4'],
              ['00/0000', '910', '4', '1', '1', '5'],
              ['00/0000', '718', '5', '3', '2', '1']


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
