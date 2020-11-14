export class TreeNode {
    id: string;
    name: string;
    type: string;
    icon: string;
    hasChildren: boolean;
    isExpanded: boolean;
    children: TreeNode[];
    templateId: string;
    parentId: string;

    constructor(options: {
        id?: string,
        name?: string,
        type?: string,
        templateId?: string,
        parentId?: string,
        icon?: string,
        hasChildren?: boolean,
        isExpanded?: boolean,
        children?: TreeNode[]
    } = {}) {
        this.id = options.id || '';
        this.name = options.name || '';
        this.type = options.type || '';
        this.templateId = options.templateId || '';
        this.parentId = options.parentId || '';
        this.icon = options.icon || '';
        this.hasChildren = !!options.hasChildren;
        this.isExpanded = !!options.hasChildren;
        this.children = options.children || [];
    }
}
