import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-data-template-navigation',
    templateUrl: './data-template-navigation.component.html',
    styleUrls: ['./data-template-navigation.component.scss']
})

export class DataTemplateNavigationComponent implements OnInit, OnDestroy {
    private routeSub: Subscription;
    templateId: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.routeSub = this.route.paramMap.subscribe(
            params => {
                this.templateId = params.get('id');
            }
        );
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }
}
