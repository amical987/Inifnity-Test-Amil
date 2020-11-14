export class DataTemplateInherited {
    id: string;
    displayName: string;
    icon: string;
}

export class UpdateDataTemplateInherited {
    parentId: string;
    childIds: string[] = [];

    constructor(parentId: string, childIds: string[]) {
        this.parentId = parentId;
        this.childIds = childIds;
    }
}
