import {Component,OnInit,OnDestroy,ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";
import {OpinionService} from "../../../../services/work/information/information.service";
import {Opinion} from "../../../../models/work/information/opinion";
import {OpinionTypeService} from "../../../../services/core/opinion_typeService/opinion_type.service";
import {CurentUserService} from "../../../../services/core/currentuser.service";


@Component({
  selector:'information-opinion-detail',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss']
})

export class DetailComponent implements OnInit,OnDestroy{
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private detailservice: OpinionService,
    private opiniontypeservice: OpinionTypeService,
    private currentuserservice: CurentUserService
  ){
    this.commonActionBarConfig.idName = 'opinion_id';
    this.commonActionBarConfig.editUrl = 'pages/work/information/opinion/edit';
    this.commonActionBarConfig.addNewUrl = 'pages/work/information/opinion/edit';
    this.commonActionBarConfig.deleteUrl = 'pages/work/information/opinion/delete';
  }
  private commonActionBarConfig: CommonActionBarConfig = new CommonActionBarConfig();
  private id:number;
  private data: any;
  private sub:any;

  ngOnInit(){
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
      this.getById(this.id);
    })
  }
  ngOnDestroy(){this.sub.unsubscribe();}

  getById(id:number){
    this.detailservice.getOpinion(id).subscribe(data=>{
      this.data = data as Opinion;
      this.setTaskLevelStyle(this.data.opinion_type_id);
      this.actionChange(this.data);
    })
  }

  opinionTypeStyle:{};
  setTaskLevelStyle(id:number){
    let type = this.opiniontypeservice.get(id);
    this.opinionTypeStyle = {
      backgroundColor: type.color
    }
  }

  //选中数据操作按钮变化
  actionChange(data:Opinion){
    let source_users = data.source_users;
    this.currentuserservice.getuser().subscribe(data=>{
      let user = data;
      //发起人中没有当前用户，则删除和编辑需求不可用
      let  purview = source_users.some(e=>{
        if(e.id == user.id) return true;
      });
      if(!purview){
        this.commonActionBarConfig.deleteUrl = '';
        this.commonActionBarConfig.editUrl = '';
      }
    })
  }


  postComment(e){
    this.detailservice.putComment(e,this.data.opinion_id).subscribe(()=>{
      this.getById(this.id);
    });
  }

  postReplay(e){
    this.detailservice.putReplay(e).subscribe(res=>this.getById(this.id));
  }

  deleteData(){
    this.detailservice.deleteOpinion(this.id).subscribe(res=>this.location.back());
  }
}


