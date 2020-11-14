import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { ITreeOptions, TreeComponent, TreeModel } from 'angular-tree-component';
import { TreeNode } from 'angular-tree-component/dist/defs/api';
import { ApiResponse } from '../../core/models/api/api-response';
import { TreeNodeMoved } from '../models/tree-node-moved';
import { TreeListApiFactory, TreeListService } from 'src/app/core';
import { ITreeListApi } from 'src/app/core/services/interfaces/itree-list.api.service';
import { Subscription } from 'rxjs';
import { MenuPanelComponent } from '../menu-panel/menu-panel.component';
import { MenuAction } from 'src/app/core/models/menus';
import { TreeContextMenu } from '../models/tree-context-menu';
import _, { forEach } from 'lodash';
import { BusyIndicator } from 'src/app/shared/models';

@Component({
    selector: 'app-tree-list',
    templateUrl: './tree-list.component.html',
    styleUrls: ['./tree-list.component.scss']
})
export class TreeListComponent implements OnInit, OnDestroy {
    private treeListApi: ITreeListApi;
    private addNewNodeSub: Subscription;
    private deleteNodeSub: Subscription;
    private currentMenuNode: any;
    menuItems: TreeContextMenu[] = [];
    busyIndicator: BusyIndicator = new BusyIndicator();
    searchKey: string = "";
    list = [
        {
            id: "someId1",
            icon: "folder_open",
            name: 'Home'
        },
        {
            id: "someId2",
            icon: "folder_open",
            name: 'News listing'
        },
        {
            id: "someId3",
            icon: "folder_open",
            name: 'Blog'
        },
        {
            id: "someId4",
            icon: "folder_open",
            name: 'Contact'
        },
        {
            id: "someId5",
            icon: "folder_open",
            name: 'Folder'
        },   {
            id: "someId6",
            icon: "folder_open",
            name: 'Gallery'
        },
         {
            id: "someId7",
            icon: "folder_open",
            name: 'test'
        },
        {
           id: "someId8",
           icon: "folder_open",
           name: 'testHome'
       }
    ]
    searchedList: any[] = this.list;

    @ViewChild(TreeComponent, { static: false }) tree: TreeComponent;
    @ViewChild(MenuPanelComponent, { static: false }) menupanel: MenuPanelComponent;

    @Input() allowDrag: boolean = false;
    @Input() treeApiName: string;
    @Input() stopEmitGlobalEvent?: boolean = true;
    @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() onMenuSelect: EventEmitter<MenuAction> = new EventEmitter<MenuAction>();
    @Output() onDoubleClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() onNodeMove: EventEmitter<TreeNodeMoved> = new EventEmitter<TreeNodeMoved>();

    public options: ITreeOptions = {
        animateExpand: true,
        getChildren: async (node: TreeNode) => {
            return await this.treeListApi.getChildren(node.id).toPromise().then((nodes: ApiResponse<TreeNode[]>) => {
                return nodes.records;
            });
        }, allowDrop: (element, { parent, index }) => {
            return !parent.data.virtual;
        }
    };

    constructor(private treeListService: TreeListService, private treeListApiFactory: TreeListApiFactory) {
    }

    ngOnInit(): void {
        this.addNewNodeSub = this.treeListService.newNode$.subscribe(node =>
            this.addNode(node)
        );

        this.deleteNodeSub = this.treeListService.deleteNode$.subscribe(nodeId =>
            this.deleteNode(nodeId)
        );
    }

    ngOnDestroy(): void {
        this.addNewNodeSub.unsubscribe();
        this.deleteNodeSub.unsubscribe();
    }

    initialized(): void {
        this.options.allowDrag = this.allowDrag;
        if (this.treeApiName) {
            this.busyIndicator.show();
            this.treeListApi = this.treeListApiFactory.apiFactory(this.treeApiName);
            this.treeListApi.getNodes().subscribe((prop: ApiResponse<any[]>) => {
                this.tree.treeModel.nodes = prop.records;
                this.tree.treeModel.update();
                this.tree.treeModel.expandAll();
                this.tree.treeModel.update();
                this.busyIndicator.hide();
            });
        }
    }

    getActiveNode(): any {
        return this.tree.treeModel.getActiveNode().data;
    }

    reloadChildren(nodeId: string): void {
        const node = this.tree.treeModel.getNodeById(nodeId);
        node.loadNodeChildren();
    }

    addNode(node: any) {
        if (node.parentId) {
            const activeNode = this.tree.treeModel.getNodeById(node.parentId);
            if(!activeNode.data.children){
                activeNode.data.children = [];
            }
            activeNode.data.children.push(node);
        } else {
            const rootNodeChildren = this.tree.treeModel.getLastRoot().data.children;
            rootNodeChildren.push(node);
        }
        this.tree.treeModel.update();
    }

    deleteNode(nodeId: string): void {
        const node = this.tree.treeModel.getNodeById(nodeId);
        if (node) {
            let parentNode = node.realParent ? node.realParent : node.treeModel.virtualRoot;
            _.remove(parentNode.data.children, function (child: any) {
                return child.id === node.data.id;
            });
            this.tree.treeModel.update();
            if (parentNode.data.children.length === 0) {
                parentNode.data.hasChildren = false;
            }
        }
    }

    onContextMenu(event: MouseEvent, item: any): void {
        event.preventDefault();
        this.currentMenuNode = item;
        this.treeListApi.getMenuItems(item.id).subscribe((prop: ApiResponse<TreeContextMenu[]>) => {
            this.menuItems = prop.records;
            this.menupanel.showMenu(event);
        });
    }

    dblClick(event: MouseEvent, node: any): void {
        event.preventDefault();
        this.onDoubleClick.emit(node);
    }

    onSelectNode($event): void {
        this.onSelect.emit($event.node.data);
        if (this.stopEmitGlobalEvent) {
            this.treeListService.selectedNode($event.node.data);
        }
    }

    onMoveNode($event): void {
        const treeNodeMoved = new TreeNodeMoved($event.node.id, $event.to.parent.id, $event.from.index, $event.to.index);
        this.onNodeMove.emit(treeNodeMoved);
    }

    onSelectMenuAction(item: TreeContextMenu): void {
        this.onMenuSelect.emit(new MenuAction(item, this.currentMenuNode.data));
    }
    filterSearchKey($event){
        this.searchKey = $event.target.value;
        this.searchedList = this.list.filter(x=>x.name.indexOf(this.searchKey) >= 0);
    }
}
