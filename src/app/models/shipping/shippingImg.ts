export class ShippingImg {
    shipping_img_id: number;
    shipping_waybill_id: number;
    path: string;
    created_at: string;
    updated_at: string;
    constructor(shippingImg) {
        if (shippingImg) {
            this.shipping_img_id = shippingImg.shipping_img_id;
            this.shipping_waybill_id = shippingImg.shipping_waybill_id;
            this.path = shippingImg.path;
            this.created_at = shippingImg.created_at;
            this.updated_at = shippingImg.updated_at;
        } else {
            this.shipping_img_id = 0;
            this.shipping_waybill_id = 0;
            this.path = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
