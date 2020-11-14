import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BreadcrumbComponent } from '../layout/breadcrumb/breadcrumb.component';

@Component({
   selector: "app-media",
   templateUrl: "./media.component.html",
})
export class MediaComponent implements AfterViewInit, OnDestroy {
   @ViewChild(BreadcrumbComponent, { static: false }) public breadcrumbComponent: BreadcrumbComponent;

   private routeSub: Subscription;

   constructor(private router: Router) { }

   public ngAfterViewInit(): void {
      this.routeSub = this.router.events.subscribe((prop: any) => {
         this.breadcrumbComponent.ngOnInit();
      });
   }

   public ngOnDestroy(): void {
      this.routeSub.unsubscribe();
   }

   public openMedia(node: any): void {
      this.router.navigate([`/media/edit/${node.data.id}`]);
   }
}
