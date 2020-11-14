import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { DataTemplateDesignComponent } from 'src/app/data-template/data-template-design/data-template-design.component';

@Injectable({
    providedIn: 'root'
})
export class DataTemplateCreateEditGuard implements CanDeactivate<DataTemplateDesignComponent> {
    canDeactivate(component: DataTemplateDesignComponent): Observable<boolean> | Promise<boolean> | boolean {
        if (component.designTemplateForm.templateDesignForm.dirty) {
            const contentName = component.designTemplateForm.templateDesignForm.get('name').value || 'New Data Template';
            return confirm(`Navigate away and lose all changes to ${contentName}?`);
        }
        return true;
    }
}
