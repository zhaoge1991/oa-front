export class SupplierRating {
    supplier_rating_id: number;
    level:string;
    name:string;
    created_at:string;
    updated_at:string;
    constructor(supplierRating){
        if(supplierRating){
            this.supplier_rating_id = supplierRating.supplier_rating_id;
            this.level = supplierRating.level;
            this.name = supplierRating.name;
            this.created_at = supplierRating.created_at;
            this.updated_at = supplierRating.updated_at;
        }else{
            this.supplier_rating_id = 0;
            this.level = '';
            this.name = '';
            this.created_at = '';
            this.updated_at = '';
        }
    }
}