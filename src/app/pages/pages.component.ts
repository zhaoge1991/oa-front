import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';
import {BaThemePreloader} from "../theme/services/baThemePreloader/baThemePreloader.service";

import {CountryService} from "../services/core/countryService/country.service";
import {StatusService} from "../services/core/statusService/status.service";
import {ProjectService} from "../services/core/projectService/project.service";
import {LanguageService} from "../services/core/languageService/language.service";
import {QuantifierService} from "../services/core/quantifierService/quantifier.service";
import {DegreeService} from "../services/core/degreeService/degree.service";
import {DepartmentService} from "../services/core/departmentService/department.service";
import {PositionService} from "../services/core/positionService/position.service";
import {DemanderService} from "../services/core/demanderService/demander.service";
import {SupplierDegreeService} from "../services/core/supplier_degreeService/supplier_degree.service";
import {SupplierLevelService} from "../services/core/supplier_levelService/supplier_level.service";
import {SupplierRatingService} from "../services/core/supplier_ratingService/supplier_rating.service";
import {SupplierStatusService} from "../services/core/supplier_statusServices/supplier_status.service";
import {PaymentService} from "../services/core/paymentService/payment.service";
import {ProvisionService} from "../services/core/provisionService/provision.service";
import {TransportService} from "../services/core/transportService/transport.service";
import {SourceService} from "../services/core/sourceService/source.service";
import {PasswordTypeService} from "../services/core/password_typeService/password_type.service";
import {OpinionDateService} from "../services/core/opinion_dateService/opinion_date.service";
import {OpinionTypeService} from "../services/core/opinion_typeService/opinion_type.service";
import {MonthRankingService} from "../services/core/month_rankingService/month_ranking.service";
import {TaskLevelService} from "../services/core/task_levelService/task_level.service";
import {TaskStatusService} from "../services/core/task_statusService/task_statu.service";
import {TaskTypeService} from "../services/core/task_typeService/task_type.service";
import {PermissionService} from "../services/core/permissionService/permission.service";
import {RoleService} from "../services/core/roleService/role.service";
import {CurrencyService} from "../services/core/currencyService/currency.service";
import {OrderTypeService} from "../services/core/ordertypeService/order_type.service";



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
    <alert></alert>
    <preloader></preloader>
    `
})
export class Pages {

  constructor(
    private _menuService: BaMenuService,
    private _baThemePreloader: BaThemePreloader,

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
    BaThemePreloader.registerLoader( this._loadData());
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);


  }

  private _loadData():Promise<any> {
    return new Promise((resolve, reject) => {
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
    });
  }
}
