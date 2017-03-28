import {Component, ViewChild, ViewEncapsulation, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';
import {Payment} from "../../../../models/common/payment";
import {PaymentService} from "../../../../services/core/paymentService/payment.service";


@Component({
  selector: 'payment-select',
  template: `
    <select  class="ng-form-control" (change)="onChange($event.target.selectedIndex)" >
  <option *ngFor="let payment of payments" [value]="payment.payment_id">{{payment.name}}</option>
</select>
    `
})

export class PaymentSelectComponent implements OnInit {
  @Input() paymentId: number;
  @Output() onPaymentChange = new EventEmitter<Payment>();
  private payments: Payment[];
  private payment:Payment;

  constructor(private paymentservice: PaymentService) {
    //this.procurementDemander = new ProcurementDemander(null);
  }
  ngOnInit() {
    this.payments = this.paymentservice.get()
  }

  //getData(procurementDemanderId: number) {
  //  this.procurementDemanderService.getDetail(procurementDemanderId).subscribe(data => {
  //    this.procurementDemander = data as ProcurementDemander;
  //    if (this.procurementDemander&&this.procurementDemander.banks){
  //      this.onBankChange.emit(this.procurementDemander.banks[0])
  //    }else{
  //      this.onBankChange.emit(new Bank(null))
  //    }
  //  })
  //}

  onChange(index: number) {
    this.onPaymentChange.emit(this.payments[index])
  }
  //ngOnChanges(changes: SimpleChanges) {
  //  if (changes['procurementDemanderId'].currentValue != changes['procurementDemanderId'].previousValue) {
  //    this.getData(changes['procurementDemanderId'].currentValue);
  //  }
  //}

}
