export class ChildNodeTypes {
    id: string;
    displayName: string;
    icon: string;
}

export class UpdateChildNodeTypes {
    parentId: string;
    childIds: string[] = [];

    constructor(parentId: string, childIds: string[]) {
        this.parentId = parentId;
        this.childIds = childIds;
    }
}
