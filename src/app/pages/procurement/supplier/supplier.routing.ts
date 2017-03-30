import {Routes, RouterModule} from '@angular/router';
import {SupplierComponent} from './supplier.component';

import {ListComponent} from './components/list.component';
import {EditComponent} from './components/edit.component';
import {AnalysisComponent} from './components/analysis.component';
const routes: Routes = [
    {
        path: 'supplier',
        component: SupplierComponent,
        children: [
            {path: '',component: ListComponent,},
            {path: 'edit/:id', component: EditComponent},
            {path: 'edit', component: EditComponent},
            {path: 'analysis', component: AnalysisComponent},
            ]
    }
];

export const routing = RouterModule.forChild(routes);
