import {Component,OnInit,OnDestroy,ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import {CommonActionBarConfig} from "../../../../models/config/commonActionBarConfig";

import {CurentUserService} from "../../../../services/core/currentuser.service";
import {AnnouncementService} from "../../../../services/work/information/announcement.service";
import {Announcement} from "../../../../models/work/information/announcement";


@Component({
  selector:'information-opinion-announcementannouncement',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss']
})

export class DetailComponent implements OnInit,OnDestroy{
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private detailservice: AnnouncementService,
    private currentuserservice: CurentUserService
  ){
    this.commonActionBarConfig.idName = 'announcement_id';
    this.commonActionBarConfig.editUrl = 'pages/work/information/announcement/edit';
    this.commonActionBarConfig.addNewUrl = 'pages/work/information/announcement/edit';
    this.commonActionBarConfig.deleteUrl = 'pages/work/information/announcement/delete';
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
    this.detailservice.getAnnouncement(id).subscribe(data=>{
      this.data = data as Announcement;
      this.actionChange(this.data);
    })
  }

  //选中数据操作按钮变化
  actionChange(data:Announcement){
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
    this.detailservice.putComment(e,this.data.announcement_id).subscribe(()=>{
      this.getById(this.id);
    });
  }

  postReplay(e){
    this.detailservice.putReplay(e).subscribe(res=>this.getById(this.id));
  }

  deleteData(){
    this.detailservice.deleteAnnouncement(this.id).subscribe(res=>this.location.back());
  }
}


