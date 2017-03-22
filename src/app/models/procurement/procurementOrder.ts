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
    demander: ProcurementDemander;
    supplier_bank: Bank;
    demander_bank: Bank;
    demander_bank_id: number;
    supplier_bank_id: number;
    procurement_supplier_id: number;
    procurement_demander_id: number;
    procurement_order_product: ProcurementOrderProduct[];
    procurement_order_cost: ProcurementOrderCost[];
    other_price: number;
    constructor(procurementOrder) {
        this.other_price = 0;
        if (procurementOrder) {
            this.procurement_order_id = procurementOrder.procurement_order_id;
            this.date_added = procurementOrder.date_added;
            this.price = procurementOrder.price;
            this.product_price = procurementOrder.product_price
            this.input_vat = procurementOrder.input_vat
            this.company = procurementOrder.company;
            this.date_delivery = procurementOrder.date_delivery
            this.date_real = procurementOrder.date_real
            this.order_place = procurementOrder.order_place
            this.currency_id = procurementOrder.currency_id
            this.currency = procurementOrder.currency
            this.contract_terms = procurementOrder.contract_terms
            this.user = procurementOrder.user
            this.remark = procurementOrder.remark
            this.procurement_order_no = procurementOrder.procurement_order_no
            this.status = procurementOrder.status
            this.procurement_contact_no = procurementOrder.procurement_contact_no
            this.tax = procurementOrder.tax
            this.demander_agent = procurementOrder.demander_agent
            this.supplier_agent = procurementOrder.supplier_agent
            this.demander = new ProcurementDemander(procurementOrder.demander);
            this.supplier_bank = new Bank(procurementOrder.supplier_bank)
            this.demander_bank = new Bank(procurementOrder.demander_bank)
            this.demander_bank_id = procurementOrder.demander_bank_id
            this.supplier_bank_id = procurementOrder.supplier_bank_id
            this.procurement_demander_id = procurementOrder.procurement_demander_id;
            this.procurement_supplier_id = procurementOrder.procurement_supplier_id
            this.procurement_order_product = [];
            this.procurement_order_cost = [];
            for (let product of procurementOrder.procurement_order_product) {
                this.procurement_order_product.push(new ProcurementOrderProduct(product))
            }
            for (let cost of procurementOrder.procurement_order_cost) {
                this.procurement_order_cost.push(new ProcurementOrderCost(cost))
                this.other_price = this.other_price * 1 + cost.price * 1;
            }
        } else {
            this.procurement_order_id = 0;
            this.date_added = '';
            this.price = 0;
            this.product_price = 0
            this.input_vat = 0
            this.company = new ProcurementSupplier();
            this.date_delivery = ''
            this.date_real = ''
            this.order_place = ''
            this.currency_id = 0
            this.currency = 0
            this.contract_terms = ''
            this.user = ''
            this.remark = ''
            this.procurement_order_no = ''
            this.status = 0
            this.procurement_contact_no = ''
            this.tax = 0
            this.demander_agent = ''
            this.supplier_agent = ''
            this.demander = new ProcurementDemander(null);
            this.supplier_bank = new Bank(null)
            this.demander_bank = new Bank(null)
            this.demander_bank_id = 0
            this.supplier_bank_id = 0
            this.procurement_demander_id = 0;
            this.procurement_supplier_id = 0
            this.procurement_order_product = [];
            this.procurement_order_cost = [];
        }



    }

    addProduct(procurementOrderProduct: ProcurementOrderProduct) {
        this.procurement_order_product.push(procurementOrderProduct);
        this.refreshPrice();

    }
    deleteProduct(selectedNode) {
        this.procurement_order_product.splice(selectedNode.childIndex, 1)
        this.refreshPrice();
    }
    addCost(procurementOrderCost: ProcurementOrderCost) {
        this.procurement_order_cost.push(procurementOrderCost);
        this.refreshPrice();
    }
    deleteCost(selectedNode) {
        this.procurement_order_cost.splice(selectedNode.childIndex, 1)
        this.refreshPrice();
    }

    refreshPrice() {
         let other_price = 0;
         let product_price = 0;
        for (let product of this.procurement_order_product) {
            product_price = product_price*1+product.quantity * product.price;
        }
        for (let cost of this.procurement_order_cost) {
            other_price = other_price*1+ cost.price*1;
        }
        this.product_price = product_price;
        this.other_price = other_price;
        this.price = product_price+other_price;
        
    }

}