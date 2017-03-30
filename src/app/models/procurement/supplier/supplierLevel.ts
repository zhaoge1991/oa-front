export class SupplierLevel {
    supplier_level_id: number;
    level:string;
    name:string;
    created_at:string;
    updated_at:string;
    constructor(supplierLevel){
        if(supplierLevel){
            this.supplier_level_id = supplierLevel.supplier_level_id;
            this.level = supplierLevel.level;
            this.name = supplierLevel.name;
            this.created_at = supplierLevel.created_at;
            this.updated_at = supplierLevel.updated_at;
        }else{
            this.supplier_level_id = 0;
            this.level = '';
            this.name = '';
            this.created_at = '';
            this.updated_at = '';
        }
    }
}