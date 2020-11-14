import { Injectable, InjectionToken, Injector, ComponentRef, TemplateRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, ScrollStrategy, PositionStrategy } from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { ControlOverlayRef } from '../models/control-overlay';
import { DEFAULT_CONFIG, DialogConfig } from '../models';

@Injectable()
export class OverlayService {

    constructor(private injector: Injector, private overlay: Overlay) { }

    open<TReturn = any, TSource = any>(componentOrTemplateRef: ComponentType<TSource> | TemplateRef<TSource>, config: DialogConfig = {}) {
        const dialogConfig = { ...DEFAULT_CONFIG, ...config };

        const overlayRef = this.createOverlay(dialogConfig);

        const dialogRef = new ControlOverlayRef<TReturn, TSource>(overlayRef, config.data);

        this.attachDialogContainer(componentOrTemplateRef, overlayRef, dialogConfig, dialogRef);

        return dialogRef;
    }

    private createOverlay(config: DialogConfig) {
        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }

    private attachDialogContainer<TSource = any>(componentOrTemplateRef: ComponentType<TSource> | TemplateRef<TSource>, overlayRef: OverlayRef, config: DialogConfig, dialogRef: ControlOverlayRef): any {
        const injector = this.createInjector(config, dialogRef);
        if (componentOrTemplateRef instanceof TemplateRef) {
            const containerPortal = new TemplatePortal(componentOrTemplateRef, null);
            const containerRef = overlayRef.attach(containerPortal);
            return containerRef;
        }
        else {
            const containerPortal = new ComponentPortal(componentOrTemplateRef, null, injector);
            const containerRef: ComponentRef<TSource> = overlayRef.attach(containerPortal);
            return containerRef.instance;
        }
    }

    private createInjector(config: DialogConfig, dialogRef: ControlOverlayRef): PortalInjector {
        const injectionTokens = new WeakMap();

        injectionTokens.set(ControlOverlayRef, dialogRef);

        return new PortalInjector(this.injector, injectionTokens);
    }

    private getOverlayConfig(config: DialogConfig): OverlayConfig {
        return new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: config.scrollStrategy || this.overlay.scrollStrategies.block(),
            positionStrategy: config.positionStrategy || this.getFefaultPosition()
        });
    }

    private getFefaultPosition(): PositionStrategy {
        return this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
    }
}
