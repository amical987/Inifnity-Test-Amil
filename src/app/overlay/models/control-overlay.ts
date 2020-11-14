import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class OverlayCloseEvent<TReturn> {
    type: 'backdropClick' | 'close';
    data: TReturn;
}

// TReturn = Response Data Type, TSource = Data passed to Modal Type
export class ControlOverlayRef<TReturn = any, TSource = any> {
    private afterClosed = new Subject<OverlayCloseEvent<TReturn>>();
    afterClosed$ = this.afterClosed.asObservable();

    constructor(private overlayRef: OverlayRef, public data: TSource) {
        overlayRef.backdropClick().subscribe(() => this._close('backdropClick', null));
    }

    close(data?: TReturn): void {
        this._close('close', data);
    }

    private _close(type: 'backdropClick' | 'close', data: TReturn) {
        this.overlayRef.dispose();
        this.afterClosed.next({
            type,
            data
        });

        this.afterClosed.complete();
    }
}
