import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { SalesContractComponent } from './salescontract.component';
import { NgaModule } from '../../theme/nga.module';
import { routing } from './salescontract.routing';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing
  ],
  declarations: [
    SalesContractComponent
  ]
})

export default class SalesContractModule {}
