import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { ContentApiService } from '../services/content-api.service';
import { ApiResponse } from 'src/app/core/models/api/api-response';
import { Content, SectionField } from '..';
import { Textbox, SectionFormGroup } from 'src/app/field-types';
import { ContentFormService } from '../services/content-form.service';
import { GenericValidator, TreeListService } from 'src/app/core';
import { debounceTime } from 'rxjs/operators';
import { ApiErrorResponse } from 'src/app/core/models/api/api-error-response';
import { TreeNode } from 'src/app/field-types/models/tree-node';
import { ContentNavigationBarComponent } from '../content-navigation-bar/content-navigation-bar.component';
import { BusyIndicator } from 'src/app/shared/models';

@Component({
    selector: 'app-content-create',
    templateUrl: './content-create.component.html',
    styleUrls: ['./content-create.component.scss']
})
export class ContentCreateEditComponent implements OnInit, OnDestroy {
    private routeSub: Subscription;
    contentForm: FormGroup;
    contentSections: SectionField[] = [];
    content: Content;
    nameControl: Textbox;
    nodeParentId: string;
    isEdit: boolean;
    busyIndicator: BusyIndicator = new BusyIndicator();

    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;
    displayMessage: { [key: string]: string } = {};

    get name() { return this.contentForm.get('name'); }
    get contentGroup() { return this.contentForm.get('contentSections'); }

    @ViewChild(ContentNavigationBarComponent, { static: false }) navigationComponent: ContentNavigationBarComponent;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
        private contentApiService: ContentApiService, private contentFormService: ContentFormService, private treeListService: TreeListService) { }

    ngOnInit(): void {
        this.routeSub = this.route.paramMap.subscribe(
            params => {
                const id = params.get('id');
                this.nodeParentId = params.get('parentId');
                this.isEdit = (this.nodeParentId == null);
                this.setupContentForm(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }

    setupContentForm(id: string): void {
        if (this.isEdit) {
            this.getContent(id);
        } else {
            this.getContentTemplate(id);
        }
    }

    getContent(nodeId: string): void {
        // TO DO - Get language from service
        this.busyIndicator.show();
        this.contentApiService.getByNodeIdWithLang("en", nodeId).subscribe((prop: ApiResponse<Content>) => {
            this.setDynamicForm(prop.records);
            this.navigationComponent.content = prop.records;
            this.busyIndicator.hide();
        });
    }

    getContentTemplate(dataTemplateId: string): void {
        this.busyIndicator.show();
        this.contentApiService.getByTemplateId(dataTemplateId).subscribe((prop: ApiResponse<Content>) => {
            this.setDynamicForm(prop.records);
            this.busyIndicator.hide();
        });
    }

    setDynamicForm(content: Content): void {
        const sectionGroup = this.contentFormService.getSectionsWithFromGroupFromContent(content);
        this.content = content;
        this.createContent(sectionGroup, content.name);
        this.setFormValidation(sectionGroup.validationMessages);
    }

    createContent(sectionGroup: SectionFormGroup, nameValue: string): void {
        this.contentSections = sectionGroup.sections;
        this.contentForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            contentSections: sectionGroup.formGroup
        });
        this.name.patchValue(nameValue);
        this.nameControl = new Textbox({
            key: 'name',
            label: 'Name',
            value: nameValue,
            order: 0
        });
    }

    setFormValidation(messages: any): void {
        this.validationMessages = messages;
        this.validationMessages['name'] = {
            required: 'Name is required.' // TO DO - Get from settings
        };

        this.genericValidator = new GenericValidator(this.validationMessages);

        this.contentForm.valueChanges.pipe(
            debounceTime(800)
        ).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.contentForm);
        });
    }

    submitNewContent(): Observable<ApiResponse<any> | ApiErrorResponse> {
        const contentFormGroup = this.contentGroup as FormGroup;
        let contentUpdates = this.contentFormService.getModifiedContent(contentFormGroup, this.content);
        contentUpdates.languageCode = 'en'; // TO DO - Get From Language Service
        contentUpdates.parentId = this.nodeParentId;
        contentUpdates.contentTreeId = this.nodeParentId;
        contentUpdates.name = this.name.value;
        contentUpdates.dataTemplateId = this.content.dataTemplateId;
        return this.contentApiService.create(contentUpdates);
    }

    isContentFormValid(): boolean {
        if (this.contentForm.valid && this.contentForm.dirty) {
            return true;
        } else {
            this.displayMessage = this.genericValidator.processSubmitMessages(this.contentForm);
            return false;
        }
    }

    newContent(): void {
        if (this.isContentFormValid()) {
            this.submitNewContent().subscribe((prop: ApiResponse<Content>) => {
                this.treeListService.addNode(new TreeNode({ id: prop.records.contentTreeId, name: prop.records.name, hasChildren: false, templateId: this.content.dataTemplateId }));
                this.router.navigate([`/content/edit/${prop.records.contentTreeId}`])
            });
        }
    }

    newContentWithRest(): void {
        if (this.isContentFormValid()) {
            this.submitNewContent().subscribe((prop: ApiResponse<Content>) => {
                this.treeListService.addNode(new TreeNode({ id: prop.records.contentTreeId, name: prop.records.name, hasChildren: false, templateId: this.content.dataTemplateId }));
                this.contentForm.reset();
            });
        }
    }

    updateContent(): void {
        if (this.isContentFormValid()) {
            const contentFormGroup = this.contentGroup as FormGroup;
            const contentUpdates = this.contentFormService.getModifiedContent(contentFormGroup, this.content);

            if (contentUpdates.tables.length > 0) { // This means user made some changes
                contentUpdates.contentTreeId = this.content.contentTreeId;
                contentUpdates.languageCode = this.content.languageCode;
                contentUpdates.parentId = this.content.parentId;
                contentUpdates.name = this.name.value;
                this.contentApiService.update(contentUpdates).subscribe((prop: ApiResponse<Content>) => {
                    this.content = prop.records;
                });
            }
        }
    }
}
