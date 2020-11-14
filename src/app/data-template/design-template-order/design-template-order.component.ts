import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormArray, FormGroup } from '@angular/forms';
import _ from 'lodash';

@Component({
    selector: 'app-design-template-order',
    templateUrl: './design-template-order.component.html',
    styleUrls: ['./design-template-order.component.scss']
})
export class DesignTemplateOrderComponent implements OnInit {
    @Input() sections: FormArray;
    ignoreSort: boolean = false;
    constructor() { }

    ngOnInit(): void {
        this.sections.removeAt(this.sections.length - 1);
        this.sections.valueChanges.subscribe(([prev, next]: [any, any]) => {
            if (!this.ignoreSort) {
                this.sections.controls.sort((a, b) => (a.get('order').value > b.get('order').value) ? 1 : -1)
            }
        });
    }

    dropItem(event: CdkDragDrop<any[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
    }

    dropGroup(event: CdkDragDrop<any>): void {
        if (event.previousContainer === event.container) {
            this.ignoreSort = true;
            moveItemInArray(event.container.data.controls, event.previousIndex, event.currentIndex);
            for (let index = 0; index < this.sections.length; index++) {
                this.sections.at(index).patchValue({ 'order': index });
            }
            this.ignoreSort = false;
        }
    }
}
