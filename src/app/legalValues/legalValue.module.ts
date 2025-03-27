import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { LegalValueComponent } from './legalValue.component';
import { LegalValueEditComponent } from './legalValue-edit/legalValue-edit.component';
import { SharedModule } from '../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [LegalValueComponent, LegalValueEditComponent],
  imports: [
    FormsModule,
    DropdownModule,
    RouterModule.forChild([
      { path: '', component: LegalValueComponent },
    ]),
    SharedModule
  ]
})
export class LegalValueModule {}
