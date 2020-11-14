import { Field } from '..';
import { BaseFormControl } from 'src/app/field-types';

export class ControlField {
    tableName: string;
    field: Field;
    control: BaseFormControl<string>;
    constructor(tableName: string, field: Field) {
        this.tableName = tableName;
        this.field = field;
    }
}
