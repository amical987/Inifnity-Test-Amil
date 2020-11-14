import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Constants } from 'src/app/core/models/constants/constants';

@Component({
    selector: "top-title-bar",
    templateUrl: "./top-title-bar.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopTitleBarComponent implements OnInit {
    barTitle: string;
    show: boolean;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly cd: ChangeDetectorRef,
        private readonly title: Title) { }

    ngOnInit() {
        let currentRoute = this.route.root;

        while (currentRoute) {
            const childrenRoutes = currentRoute.children;
            currentRoute = null;

            childrenRoutes.forEach(route => {
                if (route.outlet !== "primary") return;

                const routeSnapshot = route.snapshot;
                if (!routeSnapshot) return;

                const data = <Data>routeSnapshot.data;

                if (data && data.showTopTitleBar) {
                    this.setData(data);
                }

                currentRoute = route;
            });
        }
    }

    private setData(data: Data): void {
        this.barTitle = data.title;
        this.show = data.showTopTitleBar;
        this.title.setTitle(`${this.barTitle} - ${Constants.Title}`);
        this.cd.markForCheck();
    }
}
