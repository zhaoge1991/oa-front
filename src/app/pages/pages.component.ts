import {Component, ViewEncapsulation} from '@angular/core';
import {AllConfigService} from "../core/allConfig.service";
@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  styles: [],
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
    <text-alert></text-alert>
    `
})
export class Pages {

  constructor(private configservice: AllConfigService) {
    //加载所有配置
    configservice.getCurrency();
    configservice.getCountry();
    configservice.getLanguage();
    configservice.getQuantifiers();
    //configservice.getZone();
    //configservice.getMenu();
    //configservice.getDegree();
    //configservice.getDepartment();
    //configservice.getPosition();
    //configservice.getDemander();
    //configservice.getSupplier_degree();
    //configservice.getSupplier_level();
    //configservice.getSupplier_rating();
    //configservice.getSupplier_status();
    //configservice.getPayment();
    //configservice.getProvision();
    //configservice.getTransport();
    //configservice.getSource();
    //configservice.getStatus();
    //configservice.getPassword_type();
    //configservice.getOpinion_dates();
    //configservice.getOpinion_type();
    //configservice.getMonth_rankings();
    //configservice.getTask_levels();
    //configservice.getTask_statuses();
    //configservice.getTask_types();
  }

  ngOnInit() {
  }
}
