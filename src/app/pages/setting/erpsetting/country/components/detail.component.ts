import {Component,OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {CountryService} from "../../../../../services/core/countryService/country.service";

@Component({
  selector: 'country-detail-component',
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss']
})

export class DetailComponent  implements OnInit,OnDestroy{
  private commonActionBarConfig: CommonActionBarConfig = new CommonActionBarConfig();
  private id:number;
  private data: any;
  private sub:any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private countryservice: CountryService
  ){
    this.commonActionBarConfig.idName = 'country_id';
    this.commonActionBarConfig.addNewUrl = 'pages/setting/erpsetting/country/edit';
    this.commonActionBarConfig.editUrl = 'pages/setting/erpsetting/country/edit';
    this.commonActionBarConfig.deleteUrl = '/api/setting/erpsetting/country/country';
  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.getById(this.id);
    })
  }
  ngOnDestroy(){this.sub.unsubscribe();}

  getById(id:number){
      this.data = this.countryservice.get(id);
  }
}
