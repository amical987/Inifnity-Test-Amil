import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icon, BusyIndicator } from 'src/app/shared/models';
import { ControlOverlayRef } from '../models';
import { HttpClient } from '@angular/common/http';
import { forEach } from 'lodash';
import { IconsApiService } from 'src/app/core/services/icons-api-service';
import { ApiResponse } from 'src/app/core/models/api';

@Component({
    selector: 'app-site-icons',
    templateUrl: './site-icons.component.html',
    styleUrls: ['./site-icons.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class SiteIconsComponent implements OnInit {
    busyIndicator: BusyIndicator = new BusyIndicator();
    icon: Icon;
    categories: string[] = [];
    searchKey: string = "";
    selectedCategory = "all";
    iconsFilter: Icon[];
    iconsCategories: Icon[] = [];

    constructor(public dialogRef: ControlOverlayRef, public http:HttpClient, private iconsApiService: IconsApiService) { }

    ngOnInit(): void {
        this.busyIndicator.show();
        this.iconsApiService.getAll().subscribe((prop: ApiResponse<any>) => {
            this.afterApiResponse(prop);
        });
    }
    private afterApiResponse(data: ApiResponse<any>){
        let that = this;
                forEach(data.records, function(category){
                    let categoryName = category.name;
                    that.categories.push(categoryName);
                    forEach(category.icons, function(icon){
                        icon.category = categoryName;
                        that.iconsCategories.push(icon);
                    })
                })
                this.iconsFilter = this.iconsCategories;
                this.busyIndicator.hide();
    }
    filterSearchKey($event){
        this.searchKey = $event.target.value;
        this.filter();
    }
    filterCategory($event){
        this.selectedCategory = $event.target.value;
        this.filter();
    }
    filter(){
        this.iconsFilter = this.iconsCategories
        .filter(x=>{return (x.name.indexOf(this.searchKey) >= 0 && x.category == this.selectedCategory)
                            || (this.selectedCategory == x.category && this.searchKey == "")
                            || (this.selectedCategory == "all" && this.searchKey == "")
                            || (this.selectedCategory == "all" && x.name.indexOf(this.searchKey) >= 0)});
    }
    selectIcon(icon: Icon): void {
        this.icon = icon;
    }
    cancel(): void {
        this.dialogRef.close();
    }
    apply(): void {
        this.dialogRef.close(this.icon);
    }
}
