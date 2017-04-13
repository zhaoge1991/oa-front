import {Component,OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {Project} from "../../../../../models/group/project";
import {AppconfigService} from "../../../../../services/core/appConfigService/appConfigService";

@Component({
  selector: 'setting-erpconfig-edit',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})

export class EditComponent {

  private progridOptions: GridOptions;
  private costgridOptions: GridOptions;
  private id:number;
  private sub:any;
  private olddata: any;
  private data;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private erpconfigservice: AppconfigService
  ){
    this.commonActionBarConfig = new CommonActionBarConfig();
    this.commonActionBarConfig.saveUrl = 'pages/setting/erpsetting/erpconfig/edit';
  }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.isEdit = !!this.id;
    })
    this.setData();
  }

  setData(){
        this.data = this.erpconfigservice.get();

        //保存原始数据
        this.olddata = JSON.parse(JSON.stringify(this.data));
  }

//保存
  save(){

      this.erpconfigservice.put(this.data).subscribe();

    // this.olddata = this.data;
  }
  ngOnDestroy(){this.sub.unsubscribe();}

}


