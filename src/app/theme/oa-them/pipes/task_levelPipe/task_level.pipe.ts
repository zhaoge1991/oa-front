import {Pipe, PipeTransform} from '@angular/core';
import {TaskLevelService} from "../../../../services/core/task_levelService/task_level.service";

@Pipe({
  name: 'tasklevelpipe'
})
export class TaskLevelPipe implements PipeTransform {
  constructor(
    private pipeservice: TaskLevelService
  ){}
  transform(id:number,property:string='name') {
    let val = this.pipeservice.get(id);
    return val?val[property]:''
  }
}
