import {NgModule,Optional, SkipSelf }       from '@angular/core';

import {TextAlertService} from "./textAlertService/textAlert.service";
import {MenuService} from "./menyService/menuService.service";
import {CurrencyService} from "./currencyService/currency.service";
import {AllConfigService} from "./allConfig.service";
import {MessageService} from "./messageComponent.service";
import {GetService} from "../common/function/getfunction";
import {
  ProductCatalogService,
  ProductListService
} from './dataservice'

import {AppconfigService} from "./appConfigService/appConfigService";
import {CountryService} from "./countryService/country.service";
import {ProjectService} from "./projectService/project.service";
import {LanguageService} from "./languageService/language.service";
import {QuantifierService} from "./quantifierService/quantifier.service";
import {ZoneService} from "./zoneService/zone.service";
import {DegreeService} from "./degreeService/degree.service";
import {DepartmentService} from "./departmentService/department.service";
import {PositionService} from "./positionService/position.service";
import {DemanderService} from "./demanderService/demander.service";
import {SupplierDegreeService} from "./supplier_degreeService/supplier_degree.service";
import {SupplierLevelService} from "./supplier_levelService/supplier_level.service";
import {SupplierRatingService} from "./supplier_ratingService/supplier_rating.service";
import {SupplierStatusService} from "./supplier_statusServices/supplier_status.service";
import {PaymentService} from "./paymentService/payment.service";
import {ProvisionService} from "./provisionService/provision.service";
import {TransportService} from "./transportService/transport.service";
import {SourceService} from "./sourceService/source.service";
import {StatusService} from "./statusService/status.service";
import {PasswordTypeService} from "./password_typeService/password_type.service";
import {OpinionDateService} from "./opinion_dateService/opinion_date.service";
import {OpinionTypeService} from "./opinion_typeService/opinion_type.service";
import {MonthRankingService} from "./month_rankingService/month_ranking.service";
import {TaskLevelService} from "./task_levelService/task_level.service";
import {TaskStatusService} from "./task_statusService/task_statu.service";
import {TaskTypeService} from "./task_typeService/task_type.service";
import {PermissionService} from "./permissionService/permission.service";
import {RoleService} from "./roleService/role.service";
import {OrderTypeService} from "./ordertypeService/order_type.service";
import {CurentUserService} from "./currentuser.service";

const CORE_SERVICE = [
  ProductCatalogService,
  ProductListService
]

@NgModule({
  providers:    [
    ...CORE_SERVICE,
    TextAlertService,
    MenuService,
    AllConfigService,
    MessageService,
    GetService,
    CurentUserService,

    AppconfigService,
    CountryService,
    ProjectService,
    CurrencyService,
    LanguageService,
    QuantifierService,
    ZoneService,
    DegreeService,
    DepartmentService,
    PositionService,
    DemanderService,
    SupplierDegreeService,
    SupplierLevelService,
    SupplierRatingService,
    SupplierStatusService,
    PaymentService,
    ProvisionService,
    TransportService,
    SourceService,
    StatusService,
    PasswordTypeService,
    OpinionDateService,
    OpinionTypeService,
    MonthRankingService,
    TaskLevelService,
    TaskStatusService,
    TaskTypeService,
    PermissionService,
    RoleService,
    OrderTypeService
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
