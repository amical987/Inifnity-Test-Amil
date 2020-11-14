import { Component, OnInit, Inject } from '@angular/core';
import { ControlOverlayRef } from '../models';
import { AlertData, AlertAnimationState, alertAnimations } from '../models/alert-notification';

@Component({
    templateUrl: './notification-message.component.html',
    styleUrls: ['./notification-message.component.scss'],
    animations: [alertAnimations.fadeToast],
})
export class NotificationMessageComponent implements OnInit {
    data: AlertData;
    animationState: AlertAnimationState = 'default';
    private intervalId: any;

    constructor(public dialogRef: ControlOverlayRef) { }

    ngOnInit(): void {
        this.data = this.dialogRef.data;
        this.intervalId = setTimeout(() => this.animationState = 'closing', 700);
    }

    ngOnDestroy(): void {
        clearTimeout(this.intervalId);
    }

    close(): void {
        this.dialogRef.close();
    }

    onFadeFinished(event: any): void {
        const { toState } = event;
        const isFadeOut = (toState as AlertAnimationState) === 'closing';
        const itFinished = this.animationState === 'closing';
        if (isFadeOut && itFinished) {
            this.close();
        }
    }
}
