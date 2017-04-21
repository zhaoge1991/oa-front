export class WarehouseOutProduct {
    warehouse_out_product_id: number;
    warehouse_out_id: number;
    product_id: number;
    model: string;
    category: string;
    zh_name: string;
    en_name: string;
    quantifier_id: number;
    quantity: number;
    price: number;
    remark: string;
    order_product_id: number;
    created_at: string;
    updated_at: string;
    constructor(product) {
        if (product) {
            if (product.warehouse_out_product_id !== undefined) {
                this.warehouse_out_product_id = product.warehouse_out_product_id;
            }else{
                this.warehouse_out_product_id = 0;
            }
            if (product.warehouse_out_id !== undefined) {
                this.warehouse_out_id = product.warehouse_out_id;
            }else{
                this.warehouse_out_id = 0;
            }
            if (product.product_id !== undefined) {
                this.product_id = product.product_id;
            }else{
                this.product_id = 0;
            }
            
            if (product.model !== undefined) {
                this.model = product.model;
            }else{
                this.model = '';
            }
            
            if (product.category !== undefined) {
                this.category = product.category;
            }else{
                this.category = '';
            }
            
            if (product.zh_name !== undefined) {
                this.zh_name = product.zh_name;
            }else{
                this.zh_name = '';
            }
            
            if (product.en_name !== undefined) {
                this.en_name = product.en_name;
            }else{
                this.en_name = '';
            }
            if (product.quantifier_id !== undefined) {
                this.quantifier_id = product.quantifier_id;
            }else{
                this.quantifier_id = 0;
            }
            
            if (product.quantity !== undefined) {
                this.quantity = product.quantity;
            }else{
                this.quantity = 0;
            }
            
            if (product.price !== undefined) {
                this.price = product.price;
            }else{
                this.price = 0;
            }
            if (product.remark !== undefined) {
                this.remark = product.remark;
            }else{
                this.remark = '';
            }
            if (product.order_product_id !== undefined) {
                this.order_product_id = product.order_product_id;
            }else{
                this.price = 0;
            }
            if (product.created_at !== undefined) {
                this.created_at = product.created_at;
            }else{
                this.created_at = '';
            }
            if (product.updated_at !== undefined) {
                this.updated_at = product.updated_at;
            }else{
                this.updated_at = '';
            }
        } else {
            this.warehouse_out_product_id = 0;
            this.warehouse_out_id = 0;
            this.product_id = 0;
            this.model = '';
            this.category = '';
            this.zh_name = '';
            this.en_name = '';
            this.quantifier_id = 0;
            this.quantity = 0;
            this.price = 0;
            this.remark = '';
            this.order_product_id = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
