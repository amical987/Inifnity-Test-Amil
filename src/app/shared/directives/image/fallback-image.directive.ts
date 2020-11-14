import { Directive, Input, OnInit } from "@angular/core";

@Directive({
    selector: "img[fallback]",
    host: {
        "(error)": "updateUrl()",
        "[src]": "src"
    }
})
export class FallbackImageDirective implements OnInit {
    @Input() src: string;
    @Input() fallback: string;

    ngOnInit(): void {
        if (!this.src) {
            this.updateUrl();
        }
    }

    private updateUrl() {
        this.src = this.fallback || "images/image-placeholder.png";
    }
}
