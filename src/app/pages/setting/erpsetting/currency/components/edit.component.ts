import {Component,OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {Currency} from "../../../../../models/localisation/currency";
import {CurrencyService} from "../../../../../services/core/currencyService/currency.service";

@Component({
  selector: 'setting-currency-edit',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})

export class EditComponent {

  private progridOptions: GridOptions;
  private costgridOptions: GridOptions;
  private id:number;
  private sub:any;
  private olddata: any;
  private data: Currency;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private currencyservice: CurrencyService,
  ){

    this.commonActionBarConfig = new CommonActionBarConfig();
    this.commonActionBarConfig.addNewUrl = 'pages/setting/erpsetting/currency/edit';
    this.commonActionBarConfig.saveUrl = 'pages/setting/erpsetting/currency/edit';
    this.commonActionBarConfig.idName = 'currency_id';
  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.isEdit = !!this.id;
    })
    this.setData();
  }

  setData(){
    if(this.id){
        this.data = this.currencyservice.get(this.id);
        this.data = new Currency(this.data);
        //保存原始数据
        this.olddata = JSON.parse(JSON.stringify(this.data));

    } else {
      this.data = new Currency(null);
      //保存原始数据
      this.olddata = JSON.parse(JSON.stringify(this.data));
    }
  }

//保存
  save(){
    if(this.isEdit){
      this.currencyservice.put(this.id,this.data).subscribe();
    } else {
      this.currencyservice.post(this.data).subscribe();
    }
    // this.olddata = this.data;
  }
  ngOnDestroy(){this.sub.unsubscribe();}

}


