import { ScrollStrategy, PositionStrategy } from '@angular/cdk/overlay';

export class DialogConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    scrollStrategy?: ScrollStrategy;
    positionStrategy?: PositionStrategy;
    data?: any;
}

export const DEFAULT_CONFIG: DialogConfig = {
    hasBackdrop: true,
    backdropClass: 'dark-backdrop',
    panelClass: 'dialog-panel'
}
