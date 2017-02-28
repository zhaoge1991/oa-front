import {Component,Input,Output,EventEmitter,OnInit} from '@angular/core';
import {AllConfigService} from "../../../core/allConfig.service";
import {CurrencyService} from "../../../core/currencyService/currency.service";
import {CountryService} from "../../../core/countryService/country.service";
import {StatusService} from "../../../core/statusService/status.service";
import {ProjectService} from "../../../core/projectService/project.service";
import {TransportService} from "../../../core/transportService/transport.service";
import {SourceService} from "../../../core/sourceService/source.service";
import {PaymentService} from "../../../core/paymentService/payment.service";
import {ProvisionService} from "../../../core/provisionService/provision.service";
import {OrderTypeService} from "../../../core/ordertypeService/order_type.service";

@Component({
  selector: 'ng-select',
  template: require('./ngselect.component.html'),
  styles: [require('./ngselect.component.scss')]
})

export class NgSelectComponent implements OnInit{
  @Input() value;
  @Output() valueChange = new EventEmitter();
  @Input() selectfor;
  @Input() showname

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
    private ordertypeservice: OrderTypeService
  ){}

  ngOnInit(){
    switch(this.selectfor) {
      case 'currency_id':
        this.options = this.currencysercive.get();break
      case 'country_id':
        this.options = this.countryservice.get();break
      case 'order_status_id':
        this.options = this.statusservice.get();break
      case 'project_id':
        this.options = this.projectservice.get();break
      case 'transport_id':
        this.options = this.transportservice.get();break
      case 'order_source_id':
        this.options = this.sourceservice.get();break
      case 'payment_id':
        this.options = this.paymentservice.get();break
      case 'provision_id':
        this.options = this.provisionservice.get();break
      case 'order_type_id':
        this.options = this.ordertypeservice.get();break
      default:
            this.options = [];
    }
  }

  onchange($event){
    this.valueChange.emit($event.target.value-0);
  }
}
