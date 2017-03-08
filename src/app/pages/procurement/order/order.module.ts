import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing } from './order.routing';
import { OrderComponent} from './order.component'
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
    OrderComponent
  ]
})
export class OrderModule {}