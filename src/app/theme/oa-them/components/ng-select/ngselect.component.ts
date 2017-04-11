import {Component,Input,Output,EventEmitter,OnInit} from '@angular/core';

import {CurrencyService} from "../../../../services/core/currencyService/currency.service";
import {CountryService} from "../../../../services/core/countryService/country.service";
import {StatusService} from "../../../../services/core/statusService/status.service";
import {ProjectService} from "../../../../services/core/projectService/project.service";
import {TransportService} from "../../../../services/core/transportService/transport.service";
import {SourceService} from "../../../../services/core/sourceService/source.service";
import {PaymentService} from "../../../../services/core/paymentService/payment.service";
import {ProvisionService} from "../../../../services/core/provisionService/provision.service";
import {OrderTypeService} from "../../../../services/core/ordertypeService/order_type.service";
import {QuantifierService} from "../../../../services/core/quantifierService/quantifier.service";
import {LanguageService} from "../../../../services/core/languageService/language.service";
import {RoleService} from "../../../../services/core/roleService/role.service";
@Component({
  selector: 'ng-select',
  templateUrl: './ngselect.component.html',
  styleUrls: []
})

export class NgSelectComponent implements OnInit{
  @Input() value;
  @Input() selectfor;
  @Input() showname;
  @Output() valueChange = new EventEmitter();

  private options: any[];

  constructor(
    private currencysercive: CurrencyService,
    private countryservice: CountryService,
    private statusservice: StatusService,
    private projectservice: ProjectService,
    private transportservice: TransportService,
    private sourceservice: SourceService,
    private paymentservice: PaymentService,
    private provisionservice: ProvisionService,
    private ordertypeservice: OrderTypeService,
    private quantifierservice: QuantifierService,
    private languageservice: LanguageService,
    private roleservice: RoleService
  ){}

  ngOnInit(){
    switch(this.selectfor) {
      case 'currency_id':
        this.options = this.currencysercive.get();break;
      case 'country_id':
        this.options = this.countryservice.get();break;
      case 'order_status_id':
        this.options = this.statusservice.get();break;
      case 'project_id':
        this.options = this.projectservice.get();break;
      case 'transport_id':
        this.options = this.transportservice.get();break;
      case 'order_source_id':
        this.options = this.sourceservice.get();break;
      case 'payment_id':
        this.options = this.paymentservice.get();break;
      case 'provision_id':
        this.options = this.provisionservice.get();break;
      case 'order_type_id':
        this.options = this.ordertypeservice.get();break;
      case 'quantifier_id':
        this.options = this.quantifierservice.get();break;
      case 'language_id':
        this.options = this.languageservice.get();break;
      case 'id':
        this.options = this.roleservice.get();break;
      default:
            this.options = [];
    }
    if(!this.value){
      this.options.splice(0,0,{
        [this.showname]:'---请选择---',
        [this.selectfor]: ' '
      })
    }
  }

  onchange($event){
    console.log($event);
    this.valueChange.emit($event.target.value-0);
  }
}
