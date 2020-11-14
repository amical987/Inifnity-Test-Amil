import { TreeListServiceType } from 'src/app/field-types/models/tree-list-service-type.enum';

export class TreeListOverlay {
    title: string;
    text: string;
    apiName: string;

    constructor(title: string, text: string, treeListServiceType: TreeListServiceType) {
        this.title = title;
        this.text = text;
        this.apiName = treeListServiceType.toString();
    }
}

