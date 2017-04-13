import {Component,OnInit,OnDestroy,ViewEncapsulation} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import {CommonActionBarConfig} from "../../../../../models/config/commonActionBarConfig";
import {TaskService} from "../../../../../services/work/task/task.service";
import {TaskLevelService} from "../../../../../services/core/task_levelService/task_level.service";
import {Task} from "../../../../../models/work/task/task";

@Component({
  selector:'sale-detai-component',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './detail.html',
  styleUrls: ['./detail.scss']
})

export class DetailComponent implements OnInit,OnDestroy{
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private taskservice: TaskService,
    private tasklevelservice: TaskLevelService
  ){
    this.commonActionBarConfig.idName = 'task_id';
    this.commonActionBarConfig.addNewUrl = 'pages/work/task/tasks/edit';
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

  taskLevelStyle:{};
  setTaskLevelStyle(id:number){
    let level = this.tasklevelservice.get(id);
    console.log(level);
    this.taskLevelStyle = {
      backgroundColor: '#'+level.color
    }
  }

  getById(id:number){
    this.taskservice.getById(id).subscribe(data=>{
      this.data = data as Task;
      this.setTaskLevelStyle(this.data.task_level_id);
    })
  }
}


