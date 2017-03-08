import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

import {CountryService} from "../services/coreService/countryService/country.service";
import {StatusService} from "../services/coreService/statusService/status.service";
import {ProjectService} from "../services/coreService/projectService/project.service";
import {LanguageService} from "../services/coreService/languageService/language.service";
import {QuantifierService} from "../services/coreService/quantifierService/quantifier.service";
import {DegreeService} from "../services/coreService/degreeService/degree.service";
import {DepartmentService} from "../services/coreService/departmentService/department.service";
import {PositionService} from "../services/coreService/positionService/position.service";
import {DemanderService} from "../services/coreService/demanderService/demander.service";
import {SupplierDegreeService} from "../services/coreService/supplier_degreeService/supplier_degree.service";
import {SupplierLevelService} from "../services/coreService/supplier_levelService/supplier_level.service";
import {SupplierRatingService} from "../services/coreService/supplier_ratingService/supplier_rating.service";
import {SupplierStatusService} from "../services/coreService/supplier_statusServices/supplier_status.service";
import {PaymentService} from "../services/coreService/paymentService/payment.service";
import {ProvisionService} from "../services/coreService/provisionService/provision.service";
import {TransportService} from "../services/coreService/transportService/transport.service";
import {SourceService} from "../services/coreService/sourceService/source.service";
import {PasswordTypeService} from "../services/coreService/password_typeService/password_type.service";
import {OpinionDateService} from "../services/coreService/opinion_dateService/opinion_date.service";
import {OpinionTypeService} from "../services/coreService/opinion_typeService/opinion_type.service";
import {MonthRankingService} from "../services/coreService/month_rankingService/month_ranking.service";
import {TaskLevelService} from "../services/coreService/task_levelService/task_level.service";
import {TaskStatusService} from "../services/coreService/task_statusService/task_statu.service";
import {TaskTypeService} from "../services/coreService/task_typeService/task_type.service";
import {PermissionService} from "../services/coreService/permissionService/permission.service";
import {RoleService} from "../services/coreService/roleService/role.service";
import {CurrencyService} from "../services/coreService/currencyService/currency.service";
import {OrderTypeService} from "../services/coreService/ordertypeService/order_type.service";


@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <!--<footer class="al-footer clearfix">-->
      <!--<div class="al-footer-right">Created with <i class="ion-heart"></i></div>-->
      <!--<div class="al-footer-main clearfix">-->
        <!--<div class="al-copy">&copy; <a href="http://akveo.com">Akveo</a> 2016</div>-->
        <!--<ul class="al-share clearfix">-->
          <!--<li><i class="socicon socicon-facebook"></i></li>-->
          <!--<li><i class="socicon socicon-twitter"></i></li>-->
          <!--<li><i class="socicon socicon-google"></i></li>-->
          <!--<li><i class="socicon socicon-github"></i></li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</footer>-->
    <ba-back-top position="200"></ba-back-top>
    <ng-message></ng-message>
    `
})
export class Pages {

  constructor(
    private _menuService: BaMenuService,

    private countryservice: CountryService,
    private currencysercive: CurrencyService,
    private statusservice: StatusService,
    private projectservice: ProjectService,
    private languageservice: LanguageService,
    private quantifierservice: QuantifierService,
    private degreeservice: DegreeService,
    private departmentservice: DepartmentService,
    private positionservice: PositionService,
    private demanderservice: DemanderService,
    private supplier_degreeservice: SupplierDegreeService,
    private supplier_level: SupplierLevelService,
    private supplier_ratingservice: SupplierRatingService,
    private supplier_statusservice: SupplierStatusService,
    private paymentservice: PaymentService,
    private provisionservice: ProvisionService,
    private transportservice: TransportService,
    private sourceservice: SourceService,
    private passwordservice: PasswordTypeService,
    private opinion_datasservice: OpinionDateService,
    private opinion_typeservice: OpinionTypeService,
    private month_rankingservice: MonthRankingService,
    private task_levelservice: TaskLevelService,
    private task_statuseservice: TaskStatusService,
    private task_typesservice: TaskTypeService,
    private permissionservice: PermissionService,
    private roleservice: RoleService,
    private ordertypeservice: OrderTypeService
  ) {
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);

    //加载所有配置
    this.countryservice.get();
    this.currencysercive.get();
    this.statusservice.get();
    this.projectservice.get();
    this.languageservice.get();
    this.quantifierservice.get();
    this.degreeservice.get();
    this.departmentservice.get();
    this.positionservice.get();
    this.demanderservice.get();
    this.supplier_degreeservice.get();
    this.supplier_level.get();
    this.supplier_ratingservice.get();
    this.supplier_statusservice.get();
    this.paymentservice.get();
    this.provisionservice.get();
    this.transportservice.get();
    this.sourceservice.get();
    this.passwordservice.get();
    this.opinion_datasservice.get();
    this.opinion_typeservice.get();
    this.month_rankingservice.get();
    this.task_levelservice.get();
    this.task_statuseservice.get();
    this.task_typesservice.get();
    this.permissionservice.get();
    this.roleservice.get();
    this.ordertypeservice.get();
  }
}
