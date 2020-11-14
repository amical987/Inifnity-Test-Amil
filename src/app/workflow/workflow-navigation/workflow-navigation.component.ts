import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-workflow-navigation',
    templateUrl: './workflow-navigation.component.html',
    styleUrls: ['./workflow-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class WorkflowNavigationComponent implements OnInit, OnDestroy {
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
