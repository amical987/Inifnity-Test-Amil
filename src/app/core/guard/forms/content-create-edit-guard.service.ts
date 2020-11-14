import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ContentCreateEditComponent } from 'src/app/content/content-create-edit/content-create.component';

@Injectable({
    providedIn: 'root'
})
export class ContentCreateEditGuard implements CanDeactivate<ContentCreateEditComponent> {
    canDeactivate(component: ContentCreateEditComponent): Observable<boolean> | Promise<boolean> | boolean {
        if (component.contentForm.dirty) {
            const contentName = component.contentForm.get('name').value || 'New Content';
            return confirm(`Navigate away and lose all changes to ${contentName}?`);
        }
        return true;
    }
}
