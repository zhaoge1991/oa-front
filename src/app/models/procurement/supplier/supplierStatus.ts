export class SupplierStatus {
    supplier_status_id: number;
    level:string;
    name:string;
    created_at:string;
    updated_at:string;
    constructor(supplierStatus){
        if(supplierStatus){
            this.supplier_status_id = supplierStatus.supplier_status_id;
            this.level = supplierStatus.level;
            this.name = supplierStatus.name;
            this.created_at = supplierStatus.created_at;
            this.updated_at = supplierStatus.updated_at;
        }else{
            this.supplier_status_id = 0;
            this.level = '';
            this.name = '';
            this.created_at = '';
            this.updated_at = '';
        }
    }
}