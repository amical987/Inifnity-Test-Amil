import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/core';
import { AppConfig } from 'src/app/app-config';
import { HttpClient } from '@angular/common/http';
import { Workflow, WorkflowAction, WorkflowStep, WorkflowScope } from '../models';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { ApiErrorResponse } from 'src/app/core/models/api/api-error-response';

@Injectable()
export class WorkflowApiService extends BaseApiService {

    constructor(readonly http: HttpClient, readonly appConfig: AppConfig) {
        super(http, appConfig);
    }

    get baseUrl(): string {
        return `${this.appConfig.appSettings.apiEndpoints.cmsApi.url}/${this.appConfig.appSettings.apiEndpoints.cmsApi.version}`;
    }

    create(workflow: Workflow): Observable<ApiResponse<string> | ApiErrorResponse> {
        return this.post<ApiResponse<string> | ApiErrorResponse>(`${this.baseUrl}/workflows`, workflow);
    }

    deleteWorkFlow(id: string): Observable<ApiResponse<boolean> | ApiErrorResponse> {
        return this.delete<ApiResponse<boolean> | ApiErrorResponse>(`${this.baseUrl}/workflows/${id}`);
    }

    getStepByWorkflowId(id: string): Observable<ApiResponse<WorkflowStep> | ApiErrorResponse> {
        return this.get<ApiResponse<WorkflowStep> | ApiErrorResponse>(`${this.baseUrl}/workflow-step/${id}`);
    }

    updateStep(workflowStep: WorkflowStep): Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.put<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/workflow-step`, { Workflow: workflowStep });
    }

    createStep(workflowStep: WorkflowStep): Observable<ApiResponse<string> | ApiErrorResponse> {
        return this.post<ApiResponse<string> | ApiErrorResponse>(`${this.baseUrl}/workflow-step`, { Workflow: workflowStep });
    }

    update(workflow: Workflow): Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.put<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/workflows`, workflow);
    }

    getAll(): Observable<ApiResponse<Workflow[]> | ApiErrorResponse> {
        return this.get<ApiResponse<Workflow[]> | ApiErrorResponse>(`${this.baseUrl}/workflows/all`);
    }

    getById(id: string): Observable<ApiResponse<Workflow> | ApiErrorResponse> {
        return this.get<ApiResponse<Workflow> | ApiErrorResponse>(`${this.baseUrl}/workflows/${id}`);
    }

    createAction(workflowAction: WorkflowAction): Observable<ApiResponse<string> | ApiErrorResponse> {
        return this.post<ApiResponse<string> | ApiErrorResponse>(`${this.baseUrl}/workflow-actions`, workflowAction);
    }

    deleteAction(workflowActionId: string): Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.delete<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/workflow-actions/${workflowActionId}`);
    }

    updateAction(workflowAction: WorkflowAction): Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.put<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/workflow-actions`, workflowAction);
    }

    getActions(): Observable<ApiResponse<WorkflowAction[]> | ApiErrorResponse> {
        return this.get<ApiResponse<WorkflowAction[]> | ApiErrorResponse>(`${this.baseUrl}/workflow-actions`);
    }

    getActionByWorkflowId(workflowActionId: string): Observable<ApiResponse<WorkflowAction> | ApiErrorResponse> {
        return this.get<ApiResponse<WorkflowAction> | ApiErrorResponse>
            (`${this.baseUrl}/workflow-actions/byWorkflowCommandId/${workflowActionId}`);
    }

    getScopes(id: string): Observable<ApiResponse<WorkflowScope> | ApiErrorResponse> {
        return this.get<ApiResponse<WorkflowScope> | ApiErrorResponse>(`${this.baseUrl}/workflow-scopes/${id}`);
    }

    updateScope(workflowScope: WorkflowScope): Observable<ApiResponse<void> | ApiErrorResponse> {
        return this.put<ApiResponse<void> | ApiErrorResponse>(`${this.baseUrl}/workflow-scopes`, { Model: workflowScope });
    }
}
