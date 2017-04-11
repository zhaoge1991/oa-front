import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import {AuthGuard} from '../theme/oa-them/guards/auth/auth.guard'
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    component: Pages,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
      { path: 'editors', loadChildren: 'app/pages/editors/editors.module#EditorsModule' },
      { path: 'components', loadChildren: 'app/pages/components/components.module#ComponentsModule' },
      { path: 'charts', loadChildren: 'app/pages/charts/charts.module#ChartsModule' },
      { path: 'ui', loadChildren: 'app/pages/ui/ui.module#UiModule' },
      { path: 'forms', loadChildren: 'app/pages/forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: 'app/pages/tables/tables.module#TablesModule' },
      { path: 'maps', loadChildren: 'app/pages/maps/maps.module#MapsModule' },
      { path: 'procurement', loadChildren:'app/pages/procurement/procurement.module#ProcurementModule' },
      { path: 'sale', loadChildren:'app/pages/sale/sale.module#SaleModule' },
      {path: 'finance', loadChildren: 'app/pages/finance/finance.module#FinanceModule'},
      {path: 'depot', loadChildren: 'app/pages/depot/depot.module#DepotModule'},
      { path: 'setting', loadChildren: 'app/pages/setting/setting.module#SettingModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
