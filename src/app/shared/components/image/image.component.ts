import { Component, Input } from "@angular/core";

@Component({
    selector: "image",
    templateUrl: "image.component.html"
})
export class ImageComponent {
    @Input() src;
    @Input() class;
}
