import { TreeNode } from '../../../field-types/models/tree-node';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api/api-response';
import { ApiErrorResponse } from '../../models/api/api-error-response';
import { TreeContextMenu } from 'src/app/field-types/models/tree-context-menu';

export interface ITreeListApi {
    getNodes(): Observable<ApiResponse<TreeNode[]> | ApiErrorResponse>;
    getChildren(parentId: string): Observable<ApiResponse<TreeNode[]> | ApiErrorResponse>;
    getMenuItems(itemId: string): Observable<ApiResponse<TreeContextMenu[]> | ApiErrorResponse>;
}
