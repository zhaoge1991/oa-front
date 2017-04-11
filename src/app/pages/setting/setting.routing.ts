import { Routes, RouterModule }  from '@angular/router';
import { ErpsettingComponent } from './erpsetting/erpsetting.component';
import {SettingComponent} from './setting.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      { path:'erpsetting', component: ErpsettingComponent },
      ]
  }
];

export const routing = RouterModule.forChild(routes);
