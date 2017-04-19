import {Component, Input,EventEmitter,Output,ViewChild,OnChanges} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap/index";
import {UserStatu} from "../../../../../../models/work/task/userStatu";
import {TaskService} from "../../../../../../services/work/task/task.service";
import {TaskStatusService} from "../../../../../../services/core/task_statusService/task_statu.service";
import {AppconfigService} from "../../../../../../services/core/appConfigService/appConfigService";
import {CurentUserService} from "../../../../../../services/core/currentuser.service";

@Component({
  selector: 'bar-common-action-bar-taskprogress',
  templateUrl: './taskProgressActionBar.component.html',
  styleUrls: ['./taskProgressActionBar.component.scss'],
  providers: [TaskService]
})

export class TaskProgressActionBarComponent  implements OnChanges{
  @Input() config:any;
  @Input() object:any
  @Output() objectChange = new EventEmitter();
  public user_statu:UserStatu = new UserStatu(null); //新事项进度
  setting = {initialFrameHeight: 230,zIndex: 1060};  //编辑器高度
  task_statuses; //所有事项状态
  show_task_statuses; //要显示的事项状态

  constructor(
    private taskservice: TaskService,
    private taskstatuservice: TaskStatusService,
    private currentuserservice: CurentUserService,
    private appconfigservice: AppconfigService
  ) {
    this.task_statuses = this.taskstatuservice.get();
  }

  ngOnChanges(){
    if(this.object && this.config.taskProgress){
      this.user_statu.task_id = this.object.task_id;
      this.isSourceUser();
    }
  }

  //判断当前用户是否是发起用户，不是则去掉已完成状态选项
  isSourceUser(){
    this.currentuserservice.getuser().subscribe(user=>{
      if(user.id !== this.object.source_user.id){
        this.show_task_statuses = this.task_statuses.filter((ele)=>{
          return ele.task_status_id !== this.appconfigservice.get('work.task.task.complete');
        });
      } else {
        this.show_task_statuses = this.task_statuses;
      }
    })
  }

  //更新进度按钮
  @ViewChild('checkdialog') checkModal: ModalDirective;
  chowcheck(){
    this.checkModal.show();
  }

  //更新事项进度
  postProgress(){
    this.taskservice.postProgress(this.user_statu).subscribe(()=>{
      this.checkModal.hide();
      this.objectChange.emit(this.object);
    });
  }

}
