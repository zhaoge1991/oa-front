import {Component,Input,Output,EventEmitter,OnInit} from '@angular/core';

import {CurrencyService} from "../../../../services/coreService/currencyService/currency.service";
import {CountryService} from "../../../../services/coreService/countryService/country.service";
import {StatusService} from "../../../../services/coreService/statusService/status.service";
import {ProjectService} from "../../../../services/coreService/projectService/project.service";
import {TransportService} from "../../../../services/coreService/transportService/transport.service";
import {SourceService} from "../../../../services/coreService/sourceService/source.service";
import {PaymentService} from "../../../../services/coreService/paymentService/payment.service";
import {ProvisionService} from "../../../../services/coreService/provisionService/provision.service";
import {OrderTypeService} from "../../../../services/coreService/ordertypeService/order_type.service";

@Component({
  selector: 'ng-select',
  templateUrl: './ngselect.component.html',
  styleUrls: []
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
