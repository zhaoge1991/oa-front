export class SupplierDegree {
    supplier_degree_id: number;
    level:string;
    name:string;
    created_at:string;
    updated_at:string;
    constructor(supplierDegree){
        if(supplierDegree){
            this.supplier_degree_id = supplierDegree.supplier_degree_id;
            this.level = supplierDegree.level;
            this.name = supplierDegree.name;
            this.created_at = supplierDegree.created_at;
            this.updated_at = supplierDegree.updated_at;
        }else{
            this.supplier_degree_id = 0;
            this.level = '';
            this.name = '';
            this.created_at = '';
            this.updated_at = '';
        }
    }
}