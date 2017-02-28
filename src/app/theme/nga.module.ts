import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {AgGridModule} from 'ag-grid-ng2/main';
import {TreeModule} from "angular2-tree-component/dist/angular2-tree-component";
import { DropdownModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import {
  BaThemeConfig
} from './theme.config';

import {
  BaThemeConfigProvider
} from './theme.configProvider';

import {
  BaAmChart,
  BaBackTop,
  BaCard,
  BaChartistChart,
  BaCheckbox,
  BaContentTop,
  BaFullCalendar,
  BaMenuItem,
  BaMenu,
  BaMsgCenter,
  BaMultiCheckbox,
  BaPageTop,
  BaPictureUploader,
  BaSidebar,
  Ng2Tab,
  ActionBar,
  TextAlertComponent,
  PagesComponent,
  PagesButtonComponent,
  CalenderComponent,
  MessageComponent,
  ScheduleComponent,
  NgSelectComponent,
  CustomerSelectComponent,
  ProductSelectComponent,
  SearchComponent
} from './components';

import { BaCardBlur } from './components/baCard/baCardBlur.directive';

import {
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun
} from './directives';

import {
  BaAppPicturePipe,
  BaKameleonPicturePipe,
  BaProfilePicturePipe,
  CountryPipe,
  ProjectPipe,
  UsersPipe,
  PaymentPipe,
  CurrencyPipe,
  OrderStatusPipe,
  TransportPipe
} from './pipes';

import {
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner,
  TextAlertService
} from './services';

import {
  EmailValidator,
  EqualPasswordsValidator
} from './validators';

import {
  AuthGuard
} from './guards'


const NGA_COMPONENTS = [
  BaAmChart,
  BaBackTop,
  BaCard,
  BaChartistChart,
  BaCheckbox,
  BaContentTop,
  BaFullCalendar,
  BaMenuItem,
  BaMenu,
  BaMsgCenter,
  BaMultiCheckbox,
  BaPageTop,
  BaPictureUploader,
  BaSidebar,
  Ng2Tab,
  ActionBar,
  TextAlertComponent,
  PagesComponent,
  PagesButtonComponent,
  CalenderComponent,
  MessageComponent,
  ScheduleComponent,
  NgSelectComponent,
  CustomerSelectComponent,
  ProductSelectComponent,
  SearchComponent
];

const NGA_DIRECTIVES = [
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun,
  BaCardBlur
];

const NGA_PIPES = [
  BaAppPicturePipe,
  BaKameleonPicturePipe,
  BaProfilePicturePipe,
  CountryPipe,
  ProjectPipe,
  UsersPipe,
  PaymentPipe,
  CurrencyPipe,
  OrderStatusPipe,
  TransportPipe
];

const NGA_SERVICES = [
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner,
  TextAlertService
];

const NGA_VALIDATORS = [
  EmailValidator,
  EqualPasswordsValidator
];

const NGA_GUARDS = [
  AuthGuard
]

@NgModule({
  declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AgGridModule,
    TreeModule,
    ReactiveFormsModule,
    DropdownModule, ModalModule
  ],
  exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS,
  ]
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
        BaThemeConfigProvider,
        BaThemeConfig,
        ...NGA_VALIDATORS,
        ...NGA_SERVICES
      ],
    };
  }
}
