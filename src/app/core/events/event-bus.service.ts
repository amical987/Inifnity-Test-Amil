import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";
import { EmitEvent } from "../models/events/emit-event";
import { Events } from "../models/events/events.enum";

@Injectable({
    providedIn: "root",
})
export class EventBusService {
    private subject$ = new Subject();

    public on(event: Events, action: any): Subscription {
        return this.subject$
            .pipe(
                filter((e: EmitEvent) => {
                    return e.name === event;
                }),
                map((e: EmitEvent) => {
                    return e.value;
                }),
            )
            .subscribe(action);
    }

    public emit(event: EmitEvent) {
        this.subject$.next(event);
    }
}
