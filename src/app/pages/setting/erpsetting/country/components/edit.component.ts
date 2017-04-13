import {Component,OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {Country} from "../../../../../models/localisation/country";
import {CountryService} from "../../../../../services/core/countryService/country.service";

@Component({
  selector: 'setting-country-edit',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})

export class EditComponent {

  private progridOptions: GridOptions;
  private costgridOptions: GridOptions;
  private id:number;
  private sub:any;
  private olddata: any;
  private data: Country;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private countryservice: CountryService
  ){

    this.commonActionBarConfig = new CommonActionBarConfig();
    this.commonActionBarConfig.addNewUrl = 'pages/setting/erpsetting/country/edit';
    this.commonActionBarConfig.saveUrl = 'pages/setting/erpsetting/country/edit';
    this.commonActionBarConfig.idName = 'country_id';
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
        this.data = this.countryservice.get(this.id);
        this.data = new Country(this.data);
        //保存原始数据
        this.olddata = JSON.parse(JSON.stringify(this.data));

    } else {
      this.data = new Country(null);
      //保存原始数据
      this.olddata = JSON.parse(JSON.stringify(this.data));
    }
  }

//保存
  save(){
    if(this.isEdit){
      this.countryservice.put(this.id,this.data).subscribe();
    } else {
      // console.log(this.data);
      this.countryservice.post(this.data).subscribe();
    }
    // this.olddata = this.data;
  }
  ngOnDestroy(){this.sub.unsubscribe();}

}


