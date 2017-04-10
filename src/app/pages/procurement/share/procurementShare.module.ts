import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SupplierLevelSelectComponent} from './select/supplierLevelSelect.component';
import {SupplierRatingSelectComponent} from './select/supplierRatingSelect.component';
import {SupplierStatusSelectComponent} from './select/supplierStatusSelect.component';
import {SupplierDegreeSelectComponent} from './select/supplierDegreeSelect.component';
const SHARE_COMPONENTS = [
    SupplierLevelSelectComponent,
    SupplierRatingSelectComponent,
    SupplierStatusSelectComponent,
    SupplierDegreeSelectComponent
]


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        ...SHARE_COMPONENTS
    ],
    providers: []
    , exports: [
        ...SHARE_COMPONENTS
    ]
})
export class ProcurementShareModule {}

