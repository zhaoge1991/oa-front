export class  TableOrderCost{
  table_order_id: number;
  table_order_cost_id: number;
  name: string;
  price: any;
  fees: string;
  created_at: string;
  updated_at: string;
  constructor(cost: TableOrderCost){
    this.table_order_id = cost.table_order_id;
    this.table_order_cost_id = cost.table_order_cost_id;
    this.name = cost.name;
    this.price = cost.price;
    this.fees = cost.fees;
    this.created_at = cost.created_at;
    this.updated_at = cost.updated_at;
  }
}
