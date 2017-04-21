import {Pipe, PipeTransform} from '@angular/core';
import {RoleService} from "../../../../services/core/roleService/role.service";

@Pipe({
  name: 'rolepipe'
})
export class RolePipe implements PipeTransform {
  constructor(
    private roleservice: RoleService
  ){}
  transform(id:number,property:string='name') {
    let val = this.roleservice.get(id);
    return val?val[property]:''
  }
}
