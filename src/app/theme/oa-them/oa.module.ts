import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import { DropdownModule, ModalModule } from 'ng2-bootstrap';
import {AgGridModule} from 'ag-grid-angular/main';
import { TreeModule } from 'angular-tree-component';


import {
  CalenderComponent,
  ActionBar,
  CostComponent,
  CustomerSelectComponent,
  MessageComponent,
  SearchComponent,
  Ng2Tab,
  NgSelectComponent,
  PagesButtonComponent,
  PagesComponent,
  ProductSelectComponent,
  ScheduleComponent,
  DialogComponent
} from './components';

//import { BaCardBlur } from '../components/baCard/baCardBlur.directive';

import {
  //BaScrollPosition,
  //BaSlimScroll,
  //BaThemeRun
} from './directives';

import {
  CountryPipe,
  ProjectPipe,
  UsersPipe,
  PaymentPipe,
  CurrencyPipe,
  OrderStatusPipe,
  TransportPipe,
  OrderCostsPipe
} from './pipes';

import {
  //BaImageLoaderService,
  //BaMenuService,
  //BaThemePreloader,
  //BaThemeSpinner
} from './services';

import {
  //EmailValidator,
  //EqualPasswordsValidator
} from './validators';

import {
  AuthGuard
} from './guards'

const NGA_COMPONENTS = [
  CalenderComponent,
  ActionBar,
  CostComponent,
  CustomerSelectComponent,
  MessageComponent,
  SearchComponent,
  Ng2Tab,
  NgSelectComponent,
  PagesButtonComponent,
  PagesComponent,
  ProductSelectComponent,
  ScheduleComponent,
  DialogComponent
];

const NGA_DIRECTIVES = [
  //BaScrollPosition,
  //BaSlimScroll,
  //BaThemeRun,
  //BaCardBlur
];

const NGA_PIPES = [
  CountryPipe,
  ProjectPipe,
  UsersPipe,
  PaymentPipe,
  CurrencyPipe,
  OrderStatusPipe,
  TransportPipe,
  OrderCostsPipe
];

const NGA_SERVICES = [
  //BaImageLoaderService,
  //BaThemePreloader,
  //BaThemeSpinner,
  //BaMenuService
];

const NGA_VALIDATORS = [
  //EmailValidator,
  //EqualPasswordsValidator
];

const NGA_GUARDS = [
  AuthGuard
]

@NgModule({
  declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgUploaderModule,
    AgGridModule.withComponents([]),
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    TreeModule
  ],
  exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ]
})
export class OaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: OaModule,
      providers: [
        ...NGA_VALIDATORS,
        ...NGA_SERVICES
      ],
    };
  }
}
