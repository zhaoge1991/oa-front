import {Routes, RouterModule} from '@angular/router';
import { ErpconfigComponent } from  './erpconfig.component';
import { ListComponent } from './components/list.component';
import { EditComponent } from './components/edit.component';

const routes: Routes= [
  {
    path: '',
    component: ErpconfigComponent,
    children: [
      {path: '',component: ListComponent},
      {path: 'edit',component: EditComponent},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
