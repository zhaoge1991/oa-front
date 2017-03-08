import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing } from './procurementOrder.routing';
import { ProcurementOrderComponent} from './procurementOrder.component'
import { ListComponent } from './components/list.component';
import { ShowComponent } from './components/show.component';
import { EditComponent } from './components/edit.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [
    ListComponent,
    ShowComponent,
    EditComponent,
    ProcurementOrderComponent
  ]
})
export class ProcurementOrderModule {}