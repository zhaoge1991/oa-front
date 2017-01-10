import {Component,OnInit} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'edit',
  template: require('./order-edit.html'),
  styles: []
})

export class OrderEditComponent implements OnInit{

  constructor(private router:Router,private route:ActivatedRoute){}
  private id:number;
  private data:{};
  ngOnInit(){
    this.route.params.subscribe((params: Params)=>this.id = params['id']);
    this.setData();
  }

  setData(){
    if(this.id){
      this.data = {
        num: this.id,
        id: 'CZK-'+Math.random()*1000000,
        state: Math.random()>0.5 ? '客户已收货':'已发货',
        pi: 'SOP-'+Math.random()*1000000,
        usid: 'SOP'+Math.random()*1000,
        usname: Math.random()>0.5 ? 'Nelson':'Apolph',
        addname: Math.random()>0.5 ? 'lucy':'starain',
        pay: Math.random()>0.5 ? 'paypal':'T/T',
        doll: Math.random()>0.5 ? 'USD':'EUR',
        money: Math.random()*10000,
        ormoney:  Math.random()*10000,
        getmoney:  Math.random()*10000,
        demoney:  Math.random()*10000,
        trmoney:  Math.random()*10000
      }
    } else {
      this.data = {
        num: '',
        id: '',
        state: '',
        pi: '',
        usid: '',
        usname: '',
        addname: '',
        pay: '',
        doll: '',
        money: '',
        ormoney:  '',
        getmoney:  '',
        demoney:  '',
        trmoney:  ''
      }
    }
  }


  goback($event){
    this.router.navigate(['pages/sale/order-manager']);
  }
}
