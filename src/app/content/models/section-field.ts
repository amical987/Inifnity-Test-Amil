import { ControlField } from '..';

export class SectionField {
    name: string;
    controlFields: ControlField[] = [];
    constructor(name: string) {
        this.name = name;
    }
}
