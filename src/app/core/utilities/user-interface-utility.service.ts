import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserInterfaceUtilityService {
    public roleInteractiveManagementObservable: Observable<boolean>;
    private roleInteractiveManagementSubject: Subject<boolean> = new Subject();

    constructor(@Inject(DOCUMENT) private readonly document: Document) {
        this.roleInteractiveManagementObservable = this.roleInteractiveManagementSubject.asObservable();
    }

    addBodyClass(className: string): void {
        this.document.body.classList.add(className);
    }

    removeBodyClass(className: string): void {
        this.document.body.classList.remove(className);
    }

    toggleRoleInteractiveManagement(enable: boolean): void {
        this.roleInteractiveManagementSubject.next(enable);
    }

    public getValidName(name: string): string {
        // Find regex on this links:
        // https://stackoverflow.com/questions/4374822/remove-all-special-characters-with-regexp
        // https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case

        const replaceName = name.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, "");

        return replaceName.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
    }

    public checkExtension(extension: any) {
        let valToLower = extension.toLowerCase();
        let regex = new RegExp("(.*?)\.(jpg|png|jpeg|bmp|gif|svg|ico|tiff|webp|apng)$");
        let regexTest = regex.test(valToLower);
        return !regexTest ? false : true;
    }
}
