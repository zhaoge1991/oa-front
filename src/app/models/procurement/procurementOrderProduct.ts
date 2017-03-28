import {ProcurementOrder} from "./procurementOrder";
export class ProcurementOrderProduct {
    procurement_order_product_id: number;
    product_id:number;
    procurement_order: ProcurementOrder;
    catagory: string;
    price: number;
    zh_name: string;
    en_name: string;
    product: any;
    model: string;
    quantity: number;
    quantifier_id:number;
    quantifier: any;
    remark: string;
    order_product: any;
    is_complete: number;
    factory_no: string;
    created_at: string;
    updated_at: string;
    constructor(procurementOrderProduct) {
        if (procurementOrderProduct) {
            if (procurementOrderProduct.procurement_order_product_id !== undefined) {
                this.procurement_order_product_id = procurementOrderProduct.procurement_order_product_id;
            }
            if (procurementOrderProduct.product_id !== undefined) {
                this.product_id = procurementOrderProduct.product_id;
            }
            if (procurementOrderProduct.procurement_order !== undefined) {
                this.procurement_order = new ProcurementOrder(procurementOrderProduct.procurement_order)
            }
            if (procurementOrderProduct.catagory !== undefined) {
                this.catagory = procurementOrderProduct.catagory
            }
            if (procurementOrderProduct.price !== undefined) {
                this.price = procurementOrderProduct.price
            }
            if (procurementOrderProduct.zh_name !== undefined) {
                this.zh_name = procurementOrderProduct.zh_name
            }
            if (procurementOrderProduct.en_name !== undefined) {
                this.en_name = procurementOrderProduct.en_name
            }
            if (procurementOrderProduct.product !== undefined) {
                this.product = procurementOrderProduct.product
            }
            if (procurementOrderProduct.model !== undefined) {
                this.model = procurementOrderProduct.model
            }

            if (procurementOrderProduct.quantity !== undefined) {
                this.quantity = procurementOrderProduct.quantity
            }
            if (procurementOrderProduct.quantifier_id !== undefined) {
                this.quantifier_id = procurementOrderProduct.quantifier_id
            }else{
                this.quantifier_id = 0
            }
            if (procurementOrderProduct.quantifier !== undefined) {
                this.quantifier = procurementOrderProduct.quantifier
            }

            if (procurementOrderProduct.remark !== undefined) {
                this.remark = procurementOrderProduct.remark
            }

            if (procurementOrderProduct.order_product !== undefined) {
                this.order_product = procurementOrderProduct.order_product
            }
            if (procurementOrderProduct.is_complete !== undefined) {
                this.is_complete = procurementOrderProduct.is_complete
            }
            if (procurementOrderProduct.factory_no !== undefined) {
                this.factory_no = procurementOrderProduct.factory_no
            }else{
                this.factory_no = '';
            }

            
            if (procurementOrderProduct.created_at !== undefined) {
                this.created_at = procurementOrderProduct.created_at
            }
            if (procurementOrderProduct.updated_at !== undefined) {
                this.updated_at = procurementOrderProduct.updated_at
            }

        }
    }
}