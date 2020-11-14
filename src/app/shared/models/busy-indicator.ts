export class BusyIndicator {
    isBusy: boolean = false;
    show(): void {
        this.isBusy = true;
    }

    hide(): void {
        this.isBusy = false;
    }
}
