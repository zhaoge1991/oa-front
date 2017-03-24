export class ProductProcurementFreeze {
    product_procurement_freeze_id: number;
    procurement_freeze_id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    user_id: number;
    status: number;
    order_product_id: number;
    out_quantity: number;
    remark: string;

    created_at: string;
    updated_at: string;
    constructor(productProcurementFreeze) {
        if (productProcurementFreeze) {
            this.product_procurement_freeze_id = productProcurementFreeze.product_procurement_freeze_id;
            this.procurement_freeze_id = productProcurementFreeze.procurement_freeze_id;
            this.order_id = productProcurementFreeze.order_id;
            this.product_id = productProcurementFreeze.product_id;
            this.user_id = productProcurementFreeze.user_id;
            this.status = productProcurementFreeze.status;
            this.order_product_id = productProcurementFreeze.order_product_id;
            this.out_quantity = productProcurementFreeze.out_quantity;
            this.remark = productProcurementFreeze.remark;
            this.created_at = productProcurementFreeze.created_at;
            this.updated_at = productProcurementFreeze.updated_at;
        } else {
            this.product_procurement_freeze_id = 0;
            this.procurement_freeze_id = 0;
            this.order_id = 0;
            this.product_id = 0;
            this.user_id = 0;
            this.status = 0;
            this.order_product_id = 0;
            this.out_quantity = 0;
            this.remark = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
