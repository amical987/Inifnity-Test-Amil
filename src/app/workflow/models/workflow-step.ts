import { Guid } from 'guid-typescript';
import { WorkflowCommand } from '.';

export class WorkflowStep {
    workflowId: string;
    steps: Step[] = [];
    roleIds: number[] = [];
    userIds: number[] = [];
}

export class Step {
    id: string = Guid.create().toString();
    name: string;
    displayName: string;
    order: number;
    iconClass: string;
    commands: WorkflowCommand[] = [];
}
