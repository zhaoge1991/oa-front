import {ProcurementSupplier} from "./procurementSupplier";
import {ProcurementDemander} from "./procurementDemander";
import {ProcurementOrderProduct} from "./procurementOrderProduct";
import {ProcurementOrderCost} from "./procurementOrderCost";
import {Bank} from "../common/finance/bank"


export class ProcurementOrder {
    procurement_order_id: number;
    date_added: string;
    price: number;
    product_price: number;
    input_vat: number;
    company: ProcurementSupplier;
    date_delivery: string;
    date_real: string;
    order_place: string;
    currency_id: number;
    currency: any;
    contract_terms: string;
    user: any;
    remark: string;
    procurement_order_no: string;
    status: number;
    procurement_contact_no: string;
    tax: number;
    demander_agent: string;
    supplier_agent: string;
    account_day: string;
    demander:ProcurementDemander;
    supplier_bank:Bank;
    demander_bank:Bank;
    procurement_order_product: ProcurementOrderProduct[];
    procurement_order_cost: ProcurementOrderCost[];
    addProduct(procurementOrderProduct: ProcurementOrderProduct) {
        this.procurement_order_product.push(procurementOrderProduct);
    }
    deleteProduct(index){
        this.procurement_order_product.splice(index, 1)
    }
    addCost(procurementOrderCost: ProcurementOrderCost) {
        this.procurement_order_cost.push(procurementOrderCost);
    }
    deleteCost(index){
        this.procurement_order_cost.splice(index, 1)
    }
    
}