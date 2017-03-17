import {Routes, RouterModule} from '@angular/router';
import {DirectorComponent} from './director.component';

import {ListComponent} from './components/list.component';
import {DetailComponent} from './components/detail.component.ts';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'director',
    component: DirectorComponent,
    children: [
      {path: '',component: ListComponent},
      {path: 'detail/:id', component: DetailComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
