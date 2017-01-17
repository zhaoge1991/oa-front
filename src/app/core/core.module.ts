import {NgModule,Optional, SkipSelf }       from '@angular/core';
import {LocationService} from "./locationService/location.services";
import {TextAlertService} from "./textAlertService/textAlert.service";
import {MenuService} from "./menyService/menuService.service";
import {AllProjectService} from "./allProjectService/allProject.service";
import {CountryService} from "./countryService/country.service";
import {ConfigService} from "./configService/config.service";
import {CurrencyService} from "./currencyService/currency.service";
import {DegreeService} from "./degreeService/degree.service";
import {DemanderService} from "./demanderService/demander.service";
import {DepartmentService} from "./departmentService/department.service";
import {EmployeeService} from "./employeeService/employee.service";
import {LanguageService} from "./languageService/language.service";
import {PaymentService} from "./paymentService/payment.service";
import {PositionService} from "./positionService/position.service";
import {ProvisionService} from "./provisionService/provision.service";
import {QuantifierService} from "./quantifierService/quantifier.service";
import {SourceService} from "./sourceService/source.service";
import {StatusService} from "./statusService/status.service";
import {SupplierDegreeService} from "./supplier_degreeService/supplier_degree.service";
import {SupplierLevelService} from "./supplier_levelService/supplier_level.service";
import {SupplierRatingService} from "./supplier_ratingService/supplier_rating.service";
import {SupplierStatusService} from "./supplier_statusServices/supplier_status.service";
import {TransportService} from "./transportService/transport.service";
import {ZoneService} from "./zoneService/zone.service";

@NgModule({
  providers:    [
    LocationService,
    TextAlertService,
    MenuService,
    AllProjectService,
    CountryService,
    ConfigService,
    CountryService,
    CurrencyService,
    DegreeService,
    DemanderService,
    DepartmentService,
    EmployeeService,
    LanguageService,
    PaymentService,
    PositionService,
    ProvisionService,
    QuantifierService,
    SourceService,
    StatusService,
    SupplierDegreeService,
    SupplierLevelService,
    SupplierRatingService,
    SupplierStatusService,
    TransportService,
    ZoneService
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
