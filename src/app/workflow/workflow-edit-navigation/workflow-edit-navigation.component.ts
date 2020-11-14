import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-workflow-edit-navigation',
    templateUrl: './workflow-edit-navigation.component.html',
    styleUrls: ['./workflow-edit-navigation.component.scss']
})
export class WorkflowEditNavigationComponent implements OnInit {
    private routeSub: Subscription;
    workflowId: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.routeSub = this.route.paramMap.subscribe(
            params => {
                if (params.keys.length > 0)
                    this.workflowId = params.get('id');
            }
        );
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }
}
