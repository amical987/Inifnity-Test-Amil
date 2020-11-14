import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocaleStorageService {
    localStorageSupported: boolean;
    constructor() {
        this.localStorageSupported = typeof window['localStorage'] != "undefined" && window['localStorage'] != null;
    }

    // add value to storage
    set(key: string, data: any): void {
        if (this.localStorageSupported) {
            localStorage.setItem(key, JSON.stringify(data));
        }
    }

    // get only all values from localStorage
    getAllValues(): Array<any> {
        var list = new Array<any>();

        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);

            list.push(value);
        }

        return list;
    }

    // get one item by key from storage
    get(key: string): any {
        if (this.localStorageSupported) {
            return JSON.parse(localStorage.getItem(key));
        } else {
            return null;
        }
    }

    // remove value from storage
    remove(key: string): void {
        if (this.localStorageSupported) {
            localStorage.removeItem(key);
        }
    }

    // clear storage (remove all items from it)
    clear(): void {
        if (this.localStorageSupported) {
            localStorage.clear();
        }
    }
}
