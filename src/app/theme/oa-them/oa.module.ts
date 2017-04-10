import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import { DropdownModule, ModalModule } from 'ng2-bootstrap';
import {AgGridModule} from 'ag-grid-angular/main';
import { FileUploadModule } from 'ng2-file-upload';
import { TreeModule } from 'angular-tree-component';

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
  PreloaderComponent,



  DemanderSelectComponent,
  DemanderBankSelectComponent,
  SupplierBankSelectComponent,
  PaymentSelectComponent,
  UserSelectComponent,

  //begin 公共操作栏
  CommonActionBarComponent,
  NewActionBarComponent,
  OpenActionBarComponent,
  EditActionBarComponent,
  ProcurementOrderActionBarComponent,
  OrderCheckActionBarComponent,
  ProcurementCheckActionBarComponent,
  ProcurmentOrderActionBarComponent,
  FinanceCheckActionBarComponent,
  FinanceActionBarComponent,
  PaymentTipActionBarComponent,
  SaleReportActionBarComponent,
  SaleOrderActionBarComponent,
  ExportActionBarComponent,
  SaveActionBarComponent,
  DeleteActionBarComponent,
  AnnexActionBarComponent,
  BackActionBarComponent,
  DepotActionBarComponent,
  ShippingActionBarComponent,
  GenerateEnterOrderActionBarComponent,
  GenerateProcurementOrderActionBarComponent,
  GenerateFreezeOrderActionBarComponent,
  ExportContractActionBarComponent,
  ExportOrderActionBarComponent,
  ProductCatalogAddChildActionBarComponent,
  ProductCatalogAddParentActionBarComponent,
  ProductCatalogEditActionBarComponent,
  ProductCatalogDeleteActionBarComponent,
  ProductDeleteActionBarComponent,
  ProductAddActionBarComponent,
  ProductEditActionBarComponent,
  //end 公共操作栏

  AlertComponent,
  SampleOrderComponent,
  AnnexesComponent
} from './components';

//import { BaCardBlur } from '../components/baCard/baCardBlur.directive';

import {
  AnnexeIconDirective,
  MoveModalDirective
} from './directives';

import {
  CountryPipe,
  ProjectPipe,
  UsersPipe,
  PaymentPipe,
  CurrencyPipe,
  OrderStatusPipe,
  TransportPipe,
  OrderCostsPipe,
  OrderTypePipe,
  QuantifierPipe,
  LanguagePipe
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
  DemanderSelectComponent,
  DemanderBankSelectComponent,
  SupplierBankSelectComponent,
  PaymentSelectComponent,
  UserSelectComponent,

  PreloaderComponent,

  //begin 公共操作栏
  CommonActionBarComponent,
  NewActionBarComponent,
  OpenActionBarComponent,
  EditActionBarComponent,
  ProcurementOrderActionBarComponent,
  OrderCheckActionBarComponent,
  ProcurementCheckActionBarComponent,
  ProcurmentOrderActionBarComponent,
  FinanceCheckActionBarComponent,
  FinanceActionBarComponent,
  SaleReportActionBarComponent,
  PaymentTipActionBarComponent,
  SaleOrderActionBarComponent,
  ExportActionBarComponent,
  SaveActionBarComponent,
  DeleteActionBarComponent,
  AnnexActionBarComponent,
  BackActionBarComponent,
  DepotActionBarComponent,
  ShippingActionBarComponent,
  GenerateEnterOrderActionBarComponent,
  GenerateProcurementOrderActionBarComponent,
  GenerateFreezeOrderActionBarComponent,
  ExportContractActionBarComponent,
  ExportOrderActionBarComponent,
  ProductCatalogAddChildActionBarComponent,
  ProductCatalogAddParentActionBarComponent,
  ProductCatalogEditActionBarComponent,
  ProductCatalogDeleteActionBarComponent,
  ProductDeleteActionBarComponent,
  ProductAddActionBarComponent,
  ProductEditActionBarComponent,
  //end 公共操作栏

  SampleOrderComponent,
  AlertComponent,
  AnnexesComponent
];

const NGA_DIRECTIVES = [
  AnnexeIconDirective,
  MoveModalDirective
];

const NGA_PIPES = [
  CountryPipe,
  ProjectPipe,
  UsersPipe,
  PaymentPipe,
  CurrencyPipe,
  OrderStatusPipe,
  TransportPipe,
  OrderCostsPipe,
  OrderTypePipe,
  QuantifierPipe,
  LanguagePipe
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
