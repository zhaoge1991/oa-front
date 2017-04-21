import {Component,OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import {GridOptions} from "ag-grid/main";
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {Quantifier} from "../../../../../models/localisation/quantifier";
import {QuantifierService} from "../../../../../services/core/quantifierService/quantifier.service";

@Component({
  selector: 'setting-quantifier-edit',
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})

export class EditComponent {

  private progridOptions: GridOptions;
  private costgridOptions: GridOptions;
  private id:number;
  private sub:any;
  private olddata: any;
  private data: Quantifier;
  private isEdit:boolean;
  private commonActionBarConfig: CommonActionBarConfig;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private quantifierservice: QuantifierService
  ){

    this.commonActionBarConfig = new CommonActionBarConfig();
    this.commonActionBarConfig.addNewUrl = 'pages/setting/erpsetting/quantifier/edit';
    this.commonActionBarConfig.saveUrl = 'pages/setting/erpsetting/quantifier/edit';
    this.commonActionBarConfig.idName = 'quantifier_id';
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
        this.data = this.quantifierservice.get(this.id);
        this.data = new Quantifier(this.data);
        //保存原始数据
        this.olddata = JSON.parse(JSON.stringify(this.data));

    } else {
      this.data = new Quantifier(null);
      //保存原始数据
      this.olddata = JSON.parse(JSON.stringify(this.data));
    }
  }

//保存
  save(){
    if(this.isEdit){
      this.quantifierservice.put(this.id,this.data).subscribe();
    } else {
      // console.log(this.data);
      this.quantifierservice.post(this.data).subscribe();
    }
    // this.olddata = this.data;
  }
  ngOnDestroy(){this.sub.unsubscribe();}

}


