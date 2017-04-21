import {Component, Input,EventEmitter,Output,ViewChild,OnChanges} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/index";

import {AppconfigService} from "../../../../../../services/core/appConfigService/appConfigService";
import {CurentUserService} from "../../../../../../services/core/currentuser.service";

@Component({
  selector: 'bar-common-action-bar-reportranking',
  templateUrl: './reportRankingActionBar.component.html',
  styleUrls: ['./reportRankingActionBar.component.scss']
})

export class ReportRankingActionBarComponent  implements OnChanges{
  @Input() config:any;
  @Input() object:any
  @Output() objectChange = new EventEmitter();
  setting = {initialFrameHeight: 230,zIndex: 1060};  //编辑器高度

  constructor(
    private currentuserservice: CurentUserService
  ) {

  }

  ngOnChanges(){
    if(this.object && this.config.reportranking){
      this.isShow();
    }
  }

  //判断当前用户是否是数据中的用户，不是则显示评论按钮
  canShow:boolean;
  isShow(){
    this.currentuserservice.getuser().subscribe(user=>{
      if(user.id !== this.object.user.id){
        this.canShow = true;
      } else {
        this.canShow = false;
      }
    })
  }

  //显示按钮
  @ViewChild('checkdialog') checkModal: ModalDirective;
  chowcheck(){
    this.checkModal.show();
  }

  //发送评论
  postRanking(){
    this.objectChange.emit(this.object);
    this.checkModal.hide();
  }

}
