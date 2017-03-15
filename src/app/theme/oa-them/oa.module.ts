import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import { DropdownModule, ModalModule } from 'ng2-bootstrap';
import {AgGridModule} from 'ag-grid-angular/main';
import { FileUploadModule } from 'ng2-file-upload';
import { TreeModule } from 'angular-tree-component';
import {Ng2PaginationModule} from 'ng2-pagination';
import {
  BaThemeConfig
} from './theme.config';

import {
  BaThemeConfigProvider
} from './theme.configProvider';

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
  SupplierSelectComponent,
  TestSelectComponent,
  FirstSelectComponent,
  
  
  
  //begin 公共操作栏
  CommonActionBarComponent,
  NewActionBarComponent,
  OpenActionBarComponent,
  EditActionBarComponent,
  ProcurementOrderActionBarComponent,
  //end 公共操作栏
  
  DialogComponent,
  SampleOrderComponent,
  AnnexesComponent
} from './components';

//import { BaCardBlur } from '../components/baCard/baCardBlur.directive';

import {
  AnnexeIconDirective
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
  AuthGuard,
  CanDeactivateGuard
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
  SupplierSelectComponent,
  TestSelectComponent,
  FirstSelectComponent,
  
  //begin 公共操作栏
  CommonActionBarComponent,
  NewActionBarComponent,
  OpenActionBarComponent,
  EditActionBarComponent,
  ProcurementOrderActionBarComponent,
  //end 公共操作栏
  
  SampleOrderComponent,
  DialogComponent,
  AnnexesComponent
];

const NGA_DIRECTIVES = [
  AnnexeIconDirective
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
  AuthGuard,
  CanDeactivateGuard
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
    FileUploadModule,
    AgGridModule.withComponents([]),
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    TreeModule,
    Ng2PaginationModule
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
