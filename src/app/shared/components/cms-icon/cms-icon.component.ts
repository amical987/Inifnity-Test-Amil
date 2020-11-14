import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "cms-icon",
    template: '<i class="material-icons">{{icon}}</i>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmsIcon {
    @Input() icon: string;
}
