import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ordercostspipe'
})
export class OrderCostsPipe implements PipeTransform {
  constructor(){}
  transform(costs:any[]) {
    let allcost: number = 0;
    for(let i=0;i<costs.length;i++){
      allcost += (costs[i].price-0)
    }
    return allcost;
  }
}
