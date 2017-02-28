import {Pipe, PipeTransform} from '@angular/core';
import {ProjectService} from "../../../core/projectService/project.service";

@Pipe({
  name: 'projectpipe'
})
export class ProjectPipe implements PipeTransform {
  constructor(
    private pipeservice: ProjectService
  ){}
  transform(id:number,property:string='project_name') {
    let val = this.pipeservice.get(id);
    return val?val[property]:''
  }
}
