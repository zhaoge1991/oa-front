import { Routes,RouterModule } from '@angular/router';
import { SalesContractComponent } from './salescontract.component'

const routes: Routes = [
  {
    path: '',
    component: SalesContractComponent
  }
];

export const routing = RouterModule.forChild(routes);
