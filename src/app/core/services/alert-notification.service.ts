import { Injectable, Injector, Inject } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { NotificationMessageComponent } from 'src/app/overlay/notification-message/notification-message.component';
import { AlertData, AlertConfig, AlertType, DefaultAlertConfig } from 'src/app/overlay/models/alert-notification';
import { OverlayService } from 'src/app/overlay/services';

@Injectable({
    providedIn: 'root'
})
export class AlertNotificationService {
    // https://stackblitz.com/edit/angular-toast-service?file=src%2Fapp%2Ftoast%2Ftoast.component.ts
    constructor(private overlay: Overlay, private overlayService: OverlayService, private parentInjector: Injector) { }

    showSuccess(options: {
        title?: string,
        text?: string,
        alertConfig?: AlertConfig
    } = {}): void {
        const config = new AlertData({  title: options.title || 'Success', text:  options.text || 'Data has been successfully saved.', type: AlertType.success });
        const dialogRef = this.overlayService.open<AlertData>(NotificationMessageComponent, { positionStrategy: this.getPositionStrategy(), data: config, backdropClass: '' });
    }

    showWarning(options: {
        title?: string,
        text?: string,
        alertConfig?: AlertConfig
    } = {}): void {
        const config = new AlertData({  title: options.title || 'Error', text:  options.text || 'An error occured during the save operation.', type: AlertType.warning });
        const dialogRef = this.overlayService.open<AlertData>(NotificationMessageComponent, { positionStrategy: this.getPositionStrategy(), data: config, backdropClass: '' });
    }

    showInfo(options: {
        title?: string,
        text?: string,
        alertConfig?: AlertConfig
    } = {}): void {
        // options.title
        const config = new AlertData({ title: options.title || 'Info', text:  options.text || 'Data has been successfully saved.', type: AlertType.info });
        const dialogRef = this.overlayService.open<AlertData>(NotificationMessageComponent, { positionStrategy: this.getPositionStrategy(), data: config, backdropClass: '' });
    }

    private getPositionStrategy() {
        return this.overlay.position()
            .global()
            .top(DefaultAlertConfig.position.top + 'px')
            .right(DefaultAlertConfig.position.right + 'px');
    }
}
