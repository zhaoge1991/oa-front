import {Component, ViewEncapsulation,OnInit} from '@angular/core';

import {CountryService} from "../core/countryService/country.service";
import {StatusService} from "../core/statusService/status.service";
import {ProjectService} from "../core/projectService/project.service";
import {LanguageService} from "../core/languageService/language.service";
import {QuantifierService} from "../core/quantifierService/quantifier.service";
import {DegreeService} from "../core/degreeService/degree.service";
import {DepartmentService} from "../core/departmentService/department.service";
import {PositionService} from "../core/positionService/position.service";
import {DemanderService} from "../core/demanderService/demander.service";
import {SupplierDegreeService} from "../core/supplier_degreeService/supplier_degree.service";
import {SupplierLevelService} from "../core/supplier_levelService/supplier_level.service";
import {SupplierRatingService} from "../core/supplier_ratingService/supplier_rating.service";
import {SupplierStatusService} from "../core/supplier_statusServices/supplier_status.service";
import {PaymentService} from "../core/paymentService/payment.service";
import {ProvisionService} from "../core/provisionService/provision.service";
import {TransportService} from "../core/transportService/transport.service";
import {SourceService} from "../core/sourceService/source.service";
import {PasswordTypeService} from "../core/password_typeService/password_type.service";
import {OpinionDateService} from "../core/opinion_dateService/opinion_date.service";
import {OpinionTypeService} from "../core/opinion_typeService/opinion_type.service";
import {MonthRankingService} from "../core/month_rankingService/month_ranking.service";
import {TaskLevelService} from "../core/task_levelService/task_level.service";
import {TaskStatusService} from "../core/task_statusService/task_statu.service";
import {TaskTypeService} from "../core/task_typeService/task_type.service";
import {PermissionService} from "../core/permissionService/permission.service";
import {RoleService} from "../core/roleService/role.service";
import {CurrencyService} from "../core/currencyService/currency.service";
import {OrderTypeService} from "../core/ordertypeService/order_type.service";
@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <ng-message></ng-message>
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
    <text-alert></text-alert>
    `
})
export class Pages implements OnInit{
  constructor(
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
    //configservice.getZone();
    //this.configservice.getMenu();

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
