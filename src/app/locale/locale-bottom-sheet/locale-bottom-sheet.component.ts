import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-locale-bottom-sheet',
  templateUrl: './locale-bottom-sheet.component.html',
  styleUrls: ['./locale-bottom-sheet.component.scss']
})
export class LocaleBottomSheetComponent {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }
}
