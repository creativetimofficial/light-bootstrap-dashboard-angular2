import { Component, AfterViewInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'lbd-checkbox',
  template: `<label class="checkbox">
      <input #checkbox type="checkbox" value="" data-toggle="checkbox" [attr.checked]="checked ? true : null">
    </label>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdCheckboxComponent implements AfterViewInit {
  @Input()
  public checked: boolean;

  @ViewChild('checkbox')
  public checkbox;

  constructor() { }

  public ngAfterViewInit() {
    const $checkbox: any = $(this.checkbox.nativeElement);
    $checkbox.checkbox();
  }
}
