import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "text-trim",
    templateUrl: "text-trim.component.html"
})
export class TextTrimComponent implements OnInit {
    @Input() text: string;
    @Input() textOriginal: string;
    @Input() maxLength: number = 25;
    @Input() textReadMore: string = "...";

    ngOnInit() {
        this.textOriginal = this.text;
        if (this.text.length > this.maxLength) {
            this.text = this.text.substring(0, this.maxLength);
        }
    }
}
