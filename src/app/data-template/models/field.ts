export class Field {
    id: string;
    name: string;
    codeName: string;
    description: string;
    defaultValue: string;
    isIndexed: boolean;
    helpDescription: string;
    order: number;
    fieldTypeId: string;
    dataSource: string;
    shared: boolean;
    isRequired: boolean;
    fieldValidations: Validation[] = [];
}

export class Validation {
    id: string;
    fieldId: string;
    validationId: string;
    value: string;
    errorMessage: string;
}
