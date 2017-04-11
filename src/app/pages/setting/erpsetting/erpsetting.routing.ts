import { Routes, RouterModule }  from '@angular/router';
import {ErpsettingComponent} from './erpsetting.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'erpsetting',
    component: ErpsettingComponent,
    children: [
      { path: 'country', loadChildren: 'app/pages/setting/erpsetting/country/country.module#CountryModule' },
      { path: 'zone', loadChildren: 'app/pages/setting/erpsetting/zone/zone.module#ZoneModule' },
      { path: 'currency', loadChildren: 'app/pages/setting/erpsetting/currency/currency.module#CurrencyModule' },
      { path: 'quantifier', loadChildren: 'app/pages/setting/erpsetting/quantifier/quantifier.module#QuantifierModule' },
      { path: 'erpconfig', loadChildren: 'app/pages/setting/erpsetting/erpconfig/erpconfig.module#ErpconfigModule' }
      ]
  }
];

export const routing = RouterModule.forChild(routes);
