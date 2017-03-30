import {SupplierLevel} from "./supplier/supplierLevel";
import {SupplierDegree} from "./supplier/supplierDegree";
import {SupplierRating} from "./supplier/supplierRating";
import {SupplierStatus} from "./supplier/supplierStatus";
import {Bank} from "../common/finance/bank";
import {SupplierContact} from "./supplier/supplierContact";
import {SupplierProduct} from "./supplier/supplierProduct"
export class ProcurementSupplier {
    procurement_supplier_id: number;
    supplier_no: string;
    full_name: string;
    simple_name: string;
    account_of: string;
    city: string;
    add: string;
    tel: string;
    fax: string;
    zip_code: string;
    user_id: number;
    closing_date: string;
    contract_terms: string;
    remark: string;
    tax_registration_no: string;
    created_at: string;
    updated_at: string;
    supplier_level_id:number;
    supplier_status_id:number;
    supplier_rating_id:number;
    supplier_degree_id:number;
    supplier_level: SupplierLevel;
    supplier_status: SupplierStatus;
    supplier_rating: SupplierRating;
    supplier_degree: SupplierDegree;
    banks: Bank[];
    contacts: SupplierContact[];
    product:SupplierProduct[];
    //可选属性
    procurement_order_count:number;
    procurement_price:number;
    delay_count:number;
    constructor(procurementSupplier) {
        if (procurementSupplier) {
            this.procurement_supplier_id = procurementSupplier.procurement_supplier_id;
            this.supplier_no = procurementSupplier.supplier_no;
            this.full_name = procurementSupplier.full_name;
            this.simple_name = procurementSupplier.simple_name;
            this.account_of = procurementSupplier.account_of;
            this.city = procurementSupplier.city;
            this.add = procurementSupplier.add;
            this.tel = procurementSupplier.tel;
            this.fax = procurementSupplier.fax;
            this.zip_code = procurementSupplier.zip_code;
            this.user_id = procurementSupplier.user_id;
            this.closing_date = procurementSupplier.closing_date;
            this.contract_terms = procurementSupplier.contract_terms;
            this.remark = procurementSupplier.remark;
            this.tax_registration_no = procurementSupplier.tax_registration_no;
            this.created_at = procurementSupplier.created_at;
            this.updated_at = procurementSupplier.updated_at;
            
            this.supplier_level_id = procurementSupplier.supplier_level_id;
            this.supplier_status_id = procurementSupplier.supplier_status_id;
            this.supplier_rating_id = procurementSupplier.supplier_rating_id;
            this.supplier_degree_id = procurementSupplier.supplier_degree_id;
            
            if(procurementSupplier.supplier_level){
                this.supplier_level = new SupplierLevel(procurementSupplier.supplier_level);
            }
            if(procurementSupplier.supplier_status){
                this.supplier_status = new SupplierStatus(procurementSupplier.supplier_status);
            }
            if(procurementSupplier.supplier_rating){
                this.supplier_rating = new SupplierRating(procurementSupplier.supplier_rating);
            }
            if(procurementSupplier.supplier_degree){
                this.supplier_degree = new SupplierDegree(procurementSupplier.supplier_degree);
            }
            this.banks = [];
            if(procurementSupplier.banks){
                 for (let bank of procurementSupplier.banks) {
                    this.banks.push(new Bank(bank)) 
                 }
            }
            this.contacts=[];
            if(procurementSupplier.contacts){
                 for (let contact of procurementSupplier.contacts) {
                    this.contacts.push(new SupplierContact(contact)) 
                 }
            }
            this.product=[];
            if(procurementSupplier.product){
                 for (let product of procurementSupplier.product) {
                    this.product.push(new SupplierProduct(product)) 
                 }
            }
            
            if(procurementSupplier.procurement_order_count){
                this.procurement_order_count = procurementSupplier.procurement_order_count;
            }
            if(procurementSupplier.procurement_price){
                this.procurement_price = procurementSupplier.procurement_price;
            }
            if(procurementSupplier.delay_count){
                this.delay_count = procurementSupplier.delay_count;
            }
            
            
            
        } else {
            this.procurement_supplier_id = 0;
            this.supplier_no =  '';
            this.full_name =  '';
            this.simple_name =  '';
            this.account_of =  '';
            this.city =  '';
            this.add =  '';
            this.tel =  '';
            this.fax =  '';
            this.zip_code = '';
            this.user_id = 0;
            this.closing_date =  '';
            this.contract_terms =  '';
            this.remark =  '';
            this.tax_registration_no =  '';
            this.created_at =  '';
            this.updated_at =  '';
            this.supplier_status = new SupplierStatus(null);
            this.supplier_level = new SupplierLevel(null);
            this.supplier_rating = new SupplierRating(null);
            this.supplier_degree = new SupplierDegree(null);
            this.banks = [];
            this.contacts=[];
            this.product=[];
        }
    }
    
    addProduct(supplierProduct: SupplierProduct) {
        this.product.push(supplierProduct);

    }
    deleteProduct(selectedNode) {
        this.product.splice(selectedNode.childIndex, 1)
    }
    
    addBank(supplierBank: Bank) {
        this.banks.push(supplierBank);

    }
    deleteBank(index) {
        this.banks.splice(index, 1)
    }
    
    addContact(supplierContact: SupplierContact) {
        this.contacts.push(supplierContact);

    }
    deleteContact(index) {
        this.contacts.splice(index, 1)
    }
    
}