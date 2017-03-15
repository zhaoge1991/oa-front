import {Pipe, PipeTransform} from '@angular/core';
import {SupplierRatingService} from "../../../services/coreService/supplier_ratingService/supplier_rating.service";

@Pipe({
  name: 'supplierRatingPipe'
})
export class supplierRatingPipe implements PipeTransform {
  constructor(
    private pipeservice: SupplierRatingService
  ){}
  transform(id:number,property:string='name') {
    let val = this.pipeservice.get(id);
    return val?val[property]:''
  }
}
