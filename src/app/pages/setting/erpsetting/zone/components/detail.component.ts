import {Component,OnInit,OnDestroy} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {ZoneService} from "../../../../../services/core/zoneService/zone.service";

@Component({
  selector: 'zone-detail-component',
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
    private zoneservice: ZoneService,
  ){
    this.commonActionBarConfig.idName = 'zone_id';
    this.commonActionBarConfig.addNewUrl = 'pages/setting/erpsetting/zone/edit';
    this.commonActionBarConfig.editUrl = 'pages/setting/erpsetting/zone/edit';
    this.commonActionBarConfig.deleteUrl = '/api/setting/erpsetting/zone/zone';
  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.getById(this.id);
    })
  }
  ngOnDestroy(){this.sub.unsubscribe();}

  getById(id:number){
      this.data = this.zoneservice.get(id);
  }
}
