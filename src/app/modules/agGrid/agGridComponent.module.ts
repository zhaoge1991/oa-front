import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgGridDegreePipeComponent} from "./procurement/supplier/agGridDegreePipe.component"
import {AgGridLevelPipeComponent} from "./procurement/supplier/agGridLevelPipe.component"
import {AgGridRatingPipeComponent} from "./procurement/supplier/agGridRatingPipe.component"
import {AgGridStatusPipeComponent} from "./procurement/supplier/agGridStatusPipe.component"
import {PipeModule} from "../../pipe/pipe.module"

const AG_GRID_COMPONENT = [
    AgGridDegreePipeComponent,
    AgGridLevelPipeComponent,
    AgGridRatingPipeComponent,
    AgGridStatusPipeComponent
];

@NgModule({
    imports: [
        CommonModule,
        PipeModule
    ],
    declarations: [
        ...AG_GRID_COMPONENT,
    ],
    exports: [
        ...AG_GRID_COMPONENT,
    ]

})
export class agGridComponentModule {}