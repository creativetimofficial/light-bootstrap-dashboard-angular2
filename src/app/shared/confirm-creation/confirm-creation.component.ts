import { Component, OnInit, Inject, INJECTOR } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-creation',
  templateUrl: './confirm-creation.component.html',
  styleUrls: ['./confirm-creation.component.scss']
})
export class ConfirmCreationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmCreationComponent>, @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onClickNo(): void {
    this.dialogRef.close();

  }

}
