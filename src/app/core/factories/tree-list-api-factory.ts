import { Injectable } from '@angular/core';
import { ITreeListApi } from '../services/interfaces/itree-list.api.service';
import { DataTemplateTreeApiService } from '../services/api/data-template-tree-api.service';
import { MediaTreeApiService } from '../services/api/media-tree-api.service';
import { ContentTreeApiService } from '../services/api/content-tree.api.service';

@Injectable({ providedIn: "root" })
export class TreeListApiFactory {

    constructor(private contentTreeApi: ContentTreeApiService, private dataTemplateTreeApi: DataTemplateTreeApiService, private mediaTreeApiService: MediaTreeApiService) {
    }

    public apiFactory(treeSection: string): ITreeListApi {
        switch (treeSection) {
            case "templates": {
                return this.dataTemplateTreeApi;
            }
            case "media": {
                return this.mediaTreeApiService;
            }
            case "content": {
                return this.contentTreeApi;
            }
            default: {
                return this.contentTreeApi;
            }
        }
    }
}

