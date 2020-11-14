import { WorkflowStepAction } from '.';

export class WorkflowCommand {
    name: string;
    displayName: string;
    nextStepId: string;
    suppressComment: boolean;
    order: number;
    iconClass: string;
    actions: WorkflowStepAction[] = [];
}
