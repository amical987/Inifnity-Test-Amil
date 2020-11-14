import { Table } from '..';

export class Content {
    dataTemplateId: string;
    contentTreeId: string;
    versionId: string;
    languageCode: string;
    name: string;
    parentId: string;
    tables: Table[] = [];
    versions: Version[];
    workflowCommands: ContentCommand[];
}

export class Version {
    id: string;
    label: string;
}

export class ContentCommand {
    id: string;
    icon: string;
    name: string;
}
