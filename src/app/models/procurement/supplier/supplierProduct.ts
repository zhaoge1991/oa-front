import {ProcurementSupplier} from "../procurementSupplier"
export class SupplierProduct {
    supplier_product_id: number;
    procurement_supplier: ProcurementSupplier;
    product_category: string;
    remark: string;
    created_at: string;
    updated_at: string;

    constructor(supplierProduct) {
        if (supplierProduct) {
            this.supplier_product_id = supplierProduct.supplier_product_id;
            this.procurement_supplier = supplierProduct.procurement_supplier;
            this.product_category = supplierProduct.product_category;
            this.remark = supplierProduct.remark;
            this.created_at = supplierProduct.created_at;
            this.updated_at = supplierProduct.updated_at;
        }else{
            this.supplier_product_id = 0;
            this.procurement_supplier = null;
            this.product_category = '';
            this.remark = '';
            this.created_at = '';
            this.updated_at = '';
        }
    }
}