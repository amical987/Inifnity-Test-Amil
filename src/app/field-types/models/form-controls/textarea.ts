import { BaseFormControl } from './base-form-control';

export class Textarea extends BaseFormControl<string> {
  controlType = 'textarea';

  constructor(options: {} = {}) {
    super(options);
  }
}
