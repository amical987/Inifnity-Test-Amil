export class TreeNodeMoved {
    id: string;
    toParentId: string;
    fromIndex: number;
    toIndex: number;

    constructor(id: string, toParentId: string, fromIndex: number, toIndex: number) {
        this.id = id;
        this.fromIndex = fromIndex;
        this.toParentId = toParentId;
        this.toIndex = toIndex;
    }
}
