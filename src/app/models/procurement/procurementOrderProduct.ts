import {ProcurementOrder} from "./procurementOrder";
export class ProcurementOrderProduct {
    procurement_order_product_id: number;
    procurement_order: ProcurementOrder;
    catagory: string;
    price: string;
    zh_name: string;
    en_name:string;
    product:any;
    model:string;
    quantity:number;
    quantifier:any;
    remark:string;
    order_product:any;
    is_complete:number;
    factory_no:string;
    created_at:string;
    updated_at:string;
    
}