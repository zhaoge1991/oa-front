import {Routes, RouterModule} from '@angular/router';
import {DemanderComponent} from './demander.component';

import {ListComponent} from './components/list.component';
import {EditComponent} from './components/edit.component';
import {AnalysisComponent} from './components/analysis.component';
const routes: Routes = [
    {
        path: 'demander',
        component: DemanderComponent,
        children: [
            {path: '',component: ListComponent,},
            {path: 'edit/:id', component: EditComponent},
            {path: 'edit', component: EditComponent},
            ]
    }
];

export const routing = RouterModule.forChild(routes);
