import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Culture } from '../models';
import { SettingsApiService } from '../services/settings-api.service';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/core';
import { debounceTime } from 'rxjs/operators';
import _ from 'lodash';

@Component({
    selector: 'app-cultures',
    templateUrl: './cultures.component.html',
    styleUrls: ['./cultures.component.scss']
})
export class CulturesComponent implements OnInit {

    displayedColumns: string[] = ['name', 'shortName', 'code', 'dictionary', 'action'];
    culture: MatTableDataSource<Culture> = new MatTableDataSource();
    showOverlay: boolean = false;
    cultureForm: FormGroup;
    displayMessage: { [key: string]: string } = {};

    private validationMessages: { [key: string]: { [key: string]: string } } = {};
    private genericValidator: GenericValidator;

    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private formBuilder: FormBuilder, private settingsApiService: SettingsApiService) { }

    ngOnInit() {
        this.getAllCultures();
        this.setFormValidation();
    }

    setFormValidation(): void {
        // TO DO - Get from settings
        this.validationMessages['name'] = {
            required: 'Name is required.'
        };
        this.validationMessages['shortName'] = {
            required: 'Short name is required.'
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    showCultureForm(): void {
        this.displayMessage = {};
        this.showOverlay = true;
        this.cultureForm = this.buildForm(null);

        this.cultureForm.valueChanges.pipe(
            debounceTime(800)
        ).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.cultureForm);
        });
    }

    addCulture(): void {
        if (this.cultureForm.valid && this.cultureForm.dirty) {
            const culture = { ...this.cultureForm.value } as Culture;
            if (culture.id == '') {
                this.createCulture(culture);
            } else {
                this.updateCulture(culture);
            }
            this.showOverlay = false;
        } else {
            this.displayMessage = this.genericValidator.processSubmitMessages(this.cultureForm);
        }
    }

    edit(culture: Culture): void {
        this.showOverlay = true;
        this.cultureForm = this.buildForm(culture);
    }

    delete(culture: Culture): void {
        this.settingsApiService.deleteCulture(culture.id).subscribe((prop: ApiResponse<any>) => {
            if (prop.records) {
                const index = _.findIndex(this.culture.data, action => {
                    return action.id == culture.id;
                });
                this.culture.data.splice(index, 1);
                this.culture._updateChangeSubscription();
            }
        });
    }

    getAllCultures(): void {
        this.settingsApiService.getCultures().subscribe((prop: ApiResponse<Culture[]>) => {
            this.culture.data = prop.records;
            this.culture.sort = this.sort;
        });
    }

    createCulture(culture: Culture): void {
        this.settingsApiService.createCulture(culture).subscribe((prop: ApiResponse<any>) => {
            culture.id = prop.records;
            this.culture.data.push(culture);
            this.culture._updateChangeSubscription();
        });
    }

    updateCulture(culture: Culture): void {
        this.settingsApiService.updateCulture(culture).subscribe((prop: ApiResponse<any>) => {
            const index = _.findIndex(this.culture.data, action => {
                return action.id == culture.id;
            });
            this.culture.data.splice(index, 1, culture);
            this.culture._updateChangeSubscription();
        });
    }

    buildForm(culture: Culture): FormGroup {
        return this.formBuilder.group({
            id: new FormControl(culture ? culture.id : ''),
            name: new FormControl(culture ? culture.name : '', Validators.required),
            shortName: new FormControl(culture ? culture.shortName : '', Validators.required),
            code: new FormControl(culture ? culture.code : ''),
            dictionary: new FormControl(culture ? culture.dictionary : '')
        });
    }

}
