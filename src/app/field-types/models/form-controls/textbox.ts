import { BaseFormControl } from './base-form-control';

export class Textbox extends BaseFormControl<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
