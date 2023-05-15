import { Component, OnInit, Inject, INJECTOR } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>, @Inject(MAT_DIALOG_DATA) public message: string) {   }

  ngOnInit(): void {
  }

  onClickNo(): void {
    this.dialogRef.close();

  }
}
