import { Component, OnInit, Inject, INJECTOR } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confim-login-error',
  templateUrl: './confim-login-error.component.html',
  styleUrls: ['./confim-login-error.component.scss']
})
export class ConfimLoginErrorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfimLoginErrorComponent>, @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }


  onClickNo(): void {
    this.dialogRef.close();

  }
}
