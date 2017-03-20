import {Component,Input,Output,EventEmitter,OnInit,OnChanges,SimpleChanges} from '@angular/core';

@Component({
  selector: 'sample-order',
  templateUrl: './sampleOrder.component.html',
  styleUrls: ['./sampleOrder.component.scss']
})

export class SampleOrderComponent implements OnChanges{
  @Input() sample_fee_info: string;
  @Input() sample_shipping_info: string;
  @Input() disabled:boolean;

  @Output() sample_fee_infoChange = new EventEmitter();
  @Output() sample_shipping_infoChange = new EventEmitter();

  //样品费用逻辑
  private sample_feeOptions = ['在正式订单中收取样品费','测试完退回样品','免费样品','其他'];
  private fee_checked: string;
  private fee_other: string = '';
  private fee_otherischecked: boolean;

  ngOnChanges(changes: SimpleChanges){
    this.getfee_checked();
    this.getshipping_checked();
  }

  getfee_checked(){
    let x=0;
    for(let i=0;i<this.sample_feeOptions.length;i++){
      if(this.sample_feeOptions[i]==this.sample_fee_info){
        this.fee_checked = this.sample_feeOptions[i];
        x++;
      }
    }
    if(x==0){
      if(this.sample_fee_info){
        this.fee_checked = '其他';
        this.fee_other = this.sample_fee_info;
      }
    }
  }

  fee_change($event){
    if($event == '其他'){
      this.fee_otherischecked = true;
      this.sample_fee_info = this.fee_other;
    } else {
      this.fee_otherischecked = false;
      this.sample_fee_info = $event;
    };
    this.sample_fee_infoChange.emit(this.sample_fee_info);
  }

  fee_inputchange($event){
    this.sample_fee_info = $event;
    this.sample_fee_infoChange.emit(this.sample_fee_info);
  }

  //发货方式及运费逻辑
  private sample_shippingCusOptions = ['客户账号发货','我司账号发货，发货前收费','我司账号发货，在正式订单收费','其他'];
  private sample_shippingComOptions = ['免费用我司账号发货','其他'];
  private isCus:boolean;
  private shipping_checked: string;
  private shipping_other:string;
  private shipping_otherischecked: boolean;

  getshipping_checked(){
    let x=0;
    for(let i=0;i<this.sample_shippingCusOptions.length;i++){
      if(this.sample_shipping_info == this.sample_shippingCusOptions[i]){
        this.shipping_checked = this.sample_shippingCusOptions[i];
        this.isCus = true;
        x++;
      }
    }
    for(let i=0;i<this.sample_shippingComOptions.length;i++){
      if(this.sample_shipping_info == this.sample_shippingComOptions[i]){
        this.shipping_checked = this.sample_shippingComOptions[i];
        this.isCus = false;
        x++;
      }
    }
    if(x==0){
      if(this.sample_shipping_info){
        this.shipping_checked = '其他';
        this.shipping_other = this.sample_shipping_info;
      }
    }
  }

  cus_change($event){
    this.isCus = $event;
  }

  shipping_change($event){
    if($event == '其他'){
      this.shipping_otherischecked = true;
      this.sample_shipping_info = this.shipping_other;
    } else {
      this.shipping_otherischecked = false;
      this.sample_shipping_info = $event;
    };
    this.sample_shipping_infoChange.emit(this.sample_shipping_info);
  }

  shipping_inputchange($event){
    this.sample_shipping_info = $event;
    this.sample_shipping_infoChange.emit(this.sample_shipping_info);
  }
}
