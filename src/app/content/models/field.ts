import { Validation } from 'src/app/core/models/forms/validation';

export class Field {
    name: string;
    codeName: string;
    value: string;
    order: number;
    typeControl: TypeControl;
    validations: Validation[]=[];
}

export class TypeControl {
    controlName: string;
    controlType: string;
}

