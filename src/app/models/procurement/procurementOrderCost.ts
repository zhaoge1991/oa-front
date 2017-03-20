import {ProcurementOrder} from "./procurementOrder";
export class ProcurementOrderCost {
    procurement_order_cost_id: number;
    procurement_order: ProcurementOrder;
    name: string;
    price: number;
    created_at: string;
    updated_at: string;
    constructor(cost) {
        if (cost) {
            this.procurement_order_cost_id = cost.procurement_order_cost_id;
            this.procurement_order = new ProcurementOrder(cost.procurement_order);
            this.name = cost.name
            this.price = cost.price;
            this.created_at = cost.created_at
            this.updated_at = cost.updated_at
        }
    }
}