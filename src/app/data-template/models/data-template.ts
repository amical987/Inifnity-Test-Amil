import { Section } from '.';

export class DataTemplate {
    id: string;
    name: string;
    codeName: string;
    description: string;
    icon: string;
    helpDescription: string;
    helpLongDescription: string;
    parentId: string;
    nodeLevel: string;
    sections: Section[] = [];
}
