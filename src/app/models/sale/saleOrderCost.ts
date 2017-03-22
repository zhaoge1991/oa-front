export class  SaleOrderCost{
  order_cost_id: number;
  order_id: number;
  name: string;
  price: string;
  fees: string;
  created_at: string;
  updated_at: string;
  constructor(cost: SaleOrderCost){
    this.order_cost_id = cost.order_cost_id;
    this.order_id = cost.order_id;
    this.name = cost.name;
    this.price = cost.price;
    this.fees = cost.fees;
    this.created_at = cost.created_at;
    this.updated_at = cost.updated_at;
  }
}
