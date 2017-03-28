export class FreezeOrderProduct {
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
    constructor(freezeOrderProduct) {
        if (freezeOrderProduct.product_procurement_freeze_id !== undefined) {
            this.product_procurement_freeze_id = freezeOrderProduct.product_procurement_freeze_id;
        } else {
            this.product_procurement_freeze_id = 0;
        }
        if (freezeOrderProduct.procurement_freeze_id !== undefined) {
            this.procurement_freeze_id = freezeOrderProduct.procurement_freeze_id;
        } else {
            this.procurement_freeze_id = 0;
        }

        if (freezeOrderProduct.product_procurement_freeze_id !== undefined) {
            this.order_id = freezeOrderProduct.order_id;
        } else {
            this.order_id = 0;
        }

        if (freezeOrderProduct.product_id !== undefined) {
            this.product_id = freezeOrderProduct.product_id
        } else {
            this.product_id = 0
        }

        if (freezeOrderProduct.quantity !== undefined) {
            this.quantity = freezeOrderProduct.quantity
        } else {
            this.quantity = 0
        }


        if (freezeOrderProduct.user_id !== undefined) {
            this.user_id = freezeOrderProduct.user_id;
        } else {
            this.user_id = 0;
        }

        if (freezeOrderProduct.status !== undefined) {
            this.status = freezeOrderProduct.status;
        } else {
            this.status = 0;
        }

        if (freezeOrderProduct.order_product_id !== undefined) {
            this.order_product_id = freezeOrderProduct.order_product_id;
        } else {
            this.order_product_id = 0;
        }

        if (freezeOrderProduct.out_quantity !== undefined) {
            this.out_quantity = freezeOrderProduct.out_quantity;
        } else {
            this.out_quantity = 0
        }

        if (freezeOrderProduct.remark !== undefined) {
            this.remark = freezeOrderProduct.remark;
        } else {
            this.remark = '';
        }

        if (freezeOrderProduct.created_at !== undefined) {
            this.created_at = freezeOrderProduct.created_at
        } else {
            this.created_at = ''
        }

        if (freezeOrderProduct.updated_at !== undefined) {
            this.updated_at = freezeOrderProduct.updated_at
        } else {
            this.updated_at = ''
        }

    }
}