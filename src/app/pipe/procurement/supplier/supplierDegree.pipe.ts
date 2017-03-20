import {Pipe, PipeTransform} from '@angular/core';
import {SupplierDegreeService} from "../../../services/core/supplier_degreeService/supplier_degree.service";

@Pipe({
    name: 'supplierDegreePipe'
})
export class supplierDegreePipe implements PipeTransform {
    constructor(
        private pipeservice: SupplierDegreeService
    ) {}
    transform(id: number, property: string = 'name') {
        let val = this.pipeservice.get(id);
        return val ? val[property] : ''
    }
}
