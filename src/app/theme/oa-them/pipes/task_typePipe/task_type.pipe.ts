import {Pipe, PipeTransform} from '@angular/core';
import {TaskTypeService} from "../../../../services/core/task_typeService/task_type.service";

@Pipe({
  name: 'tasktypepipe'
})
export class TaskTypePipe implements PipeTransform {
  constructor(
    private pipeservice: TaskTypeService
  ){}
  transform(id:number,property:string='name') {
    let val = this.pipeservice.get(id);
    return val?val[property]:''
  }
}
