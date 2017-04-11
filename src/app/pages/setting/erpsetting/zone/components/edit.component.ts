import {Component,OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {Zone} from "../../../../../models/localisation/zone";
import {ZoneService} from "../../../../../services/core/zoneService/zone.service";

@Component({
  selector: 'setting-zone-edit',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})

export class EditComponent {

  private progridOptions: GridOptions;
  private costgridOptions: GridOptions;
  private id:number;
  private sub:any;
  private olddata: any;
  private data: Zone;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private zoneservice: ZoneService,
  ){

    this.commonActionBarConfig = new CommonActionBarConfig();
    this.commonActionBarConfig.addNewUrl = 'pages/setting/erpsetting/zone/edit';
    this.commonActionBarConfig.saveUrl = 'pages/setting/erpsetting/zone/edit';
    this.commonActionBarConfig.idName = 'zone_id';
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
        this.data = this.zoneservice.get(this.id);
        this.data = new Zone(this.data);
        //保存原始数据
        this.olddata = JSON.parse(JSON.stringify(this.data));

    } else {
      this.data = new Zone(null);
      // this.data.postcode_required=518000;
      // this.data.status=1;
      // this.data.country_id=99;
      //
      // this.data.created_at = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
      // this.data.updated_at=this.data.created_at;

      //保存原始数据
      this.olddata = JSON.parse(JSON.stringify(this.data));
    }
  }

//保存
  save(){
    if(this.isEdit){
      this.zoneservice.put(this.id,this.data).subscribe();
    } else {
      this.zoneservice.post(this.data).subscribe();
    }
    // this.olddata = this.data;
  }
  ngOnDestroy(){this.sub.unsubscribe();}

}


