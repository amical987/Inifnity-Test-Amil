import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from "angular-tree-component";
import { MaterialCustomModule } from '../material-custom/material-custom.module';
import { MultipleTreeListComponent } from './list-types/multiple-tree-list/multiple-tree-list.component';
import { TreeListComponent } from './tree-list/tree-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldMappingFactory } from './factories/field-mapping.service';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MultipleTreeListComponent, TreeListComponent, MenuPanelComponent],
  imports: [
    TreeModule.forRoot(),
    CommonModule,
    MaterialCustomModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [MultipleTreeListComponent, TreeListComponent],
  providers: [FieldMappingFactory]
})
export class FieldTypesModule { }

