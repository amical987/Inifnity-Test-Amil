import { PaginationInfo } from "../pagination/pagination-info";

export interface ApiResponse<TEntity> {
    records: TEntity;
    paginationInfo: PaginationInfo;
}
