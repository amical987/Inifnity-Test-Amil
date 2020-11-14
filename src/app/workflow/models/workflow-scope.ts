export class WorkflowScope {
    workflowId: string;
    workflowScopes: Scope[];
}
export class Scope {
    dataTemplateName: string;
    dataTemplateId: string;
    constructor(dataTemplateId: string) {
        this.dataTemplateId = dataTemplateId;
    }
}
