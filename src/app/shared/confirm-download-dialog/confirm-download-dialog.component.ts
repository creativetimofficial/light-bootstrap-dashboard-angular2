
import { Component, OnInit, Inject, INJECTOR } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-download-dialog',
  templateUrl: './confirm-download-dialog.component.html',
  styleUrls: ['./confirm-download-dialog.component.scss']
})
export class ConfirmDownloadDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDownloadDialogComponent>, @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onClickNo(): void {
    this.dialogRef.close();

  }

}
