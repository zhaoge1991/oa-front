import {Routes, RouterModule} from '@angular/router';
import { QuantifierComponent } from  './quantifier.component';
import { ListComponent } from './components/list.component';
import { DetailComponent } from './components/detail.component';
import { EditComponent } from './components/edit.component';


const routes: Routes= [
  {
    path: '',
    component: QuantifierComponent,
    children: [
      {path: '',component: ListComponent},
      {path: 'detail/:id',component: DetailComponent},
      {path: 'edit',component: EditComponent},
      {path: 'edit/:id',component: EditComponent},
    ]
  }
];

export const routing = RouterModule.forChild(routes);
