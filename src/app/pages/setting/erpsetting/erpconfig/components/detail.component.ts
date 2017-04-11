import {Component,OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {AppconfigService} from "../../../../../services/core/appConfigService/appConfigService";

@Component({
  selector: 'erpconfig-detail-component',
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
    private erpconfigservice: AppconfigService,
  ){
    this.commonActionBarConfig.idName = 'erpconfig_id';
    this.commonActionBarConfig.addNewUrl = 'pages/setting/erpsetting/erpconfig/edit';
    this.commonActionBarConfig.editUrl = 'pages/setting/erpsetting/erpconfig/edit';
    this.commonActionBarConfig.deleteUrl = '/api/setting/erpsetting/erpconfig/erpconfig';
  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.getById(this.id);
    })
  }
  ngOnDestroy(){this.sub.unsubscribe();}

  getById(id:number){
      this.data = this.erpconfigservice.get();
  }
}
