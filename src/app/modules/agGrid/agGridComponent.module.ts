import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AgGridDegreePipeComponent} from "./procurement/supplier/agGridDegreePipe.component"
import {AgGridLevelPipeComponent} from "./procurement/supplier/agGridLevelPipe.component"
import {AgGridRatingPipeComponent} from "./procurement/supplier/agGridRatingPipe.component"
import {AgGridStatusPipeComponent} from "./procurement/supplier/agGridStatusPipe.component"
import {PipeModule} from "../../pipe/pipe.module"
import {OaModule} from "../../theme/oa-them/oa.module"

import {AgGridCurrencyComponent} from "./common/agGridCurrency.component"
import {AgGridMultiLineComponent} from "./common/agGridMultiLine.component"


const AG_GRID_COMPONENT = [
    AgGridDegreePipeComponent,
    AgGridLevelPipeComponent,
    AgGridRatingPipeComponent,
    AgGridStatusPipeComponent,
    AgGridCurrencyComponent,
    AgGridMultiLineComponent
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        PipeModule,
        OaModule
    ],
    declarations: [
        ...AG_GRID_COMPONENT,
    ],
    exports: [
        ...AG_GRID_COMPONENT,
    ]

})
export class AgGridComponentModule {}