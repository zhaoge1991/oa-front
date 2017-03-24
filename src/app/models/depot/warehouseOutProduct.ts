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
            this.warehouse_out_product_id = product.warehouse_out_product_id;
            this.warehouse_out_id = product.warehouse_out_id;
            this.product_id = product.product_id;
            this.model = product.model;
            this.category = product.category;
            this.zh_name = product.zh_name;
            this.en_name = product.en_name;
            this.quantifier_id = product.quantifier_id;
            this.quantity = product.quantity;
            this.price = product.price;
            this.remark = product.remark;
            this.order_product_id = product.order_product_id;
            this.created_at = product.created_at;
            this.updated_at = product.updated_at;
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
