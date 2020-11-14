import { Field } from '.';

export class Section {
    id: string;
    name: string;
    order: number;
    dataTemplateId: string;
    fields: Field[] = [];
}
