export class ShippingWaybill {
    shipping_waybill_id: number;
    order_id: number;
    ship_date: string;
    
    estimated_arrival_date: string;
    transport_id: number;
    invoice_number: string;
    delivery_number: string;
    currency_id: number;
    actual_shipping_costs: number;
    sender_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    constructor(shippingwaybill) {
        if (shippingwaybill) {
            this.shipping_waybill_id = shippingwaybill.shipping_waybill_id;
            this.order_id = shippingwaybill.order_id;
            this.ship_date = shippingwaybill.ship_date;
            
            
            this.estimated_arrival_date = shippingwaybill.estimated_arrival_date;
            this.transport_id = shippingwaybill.transport_id;
            this.invoice_number = shippingwaybill.invoice_number;
            this.delivery_number = shippingwaybill.delivery_number;
            this.currency_id = shippingwaybill.currency_id;
            this.actual_shipping_costs = shippingwaybill.actual_shipping_costs;
            this.sender_id = shippingwaybill.sender_id;
            this.user_id = shippingwaybill.user_id;
            this.created_at = shippingwaybill.created_at;
            this.updated_at = shippingwaybill.updated_at;
        } else {
            this.shipping_waybill_id = 0;
            this.order_id = 0;
            this.ship_date = '';
            this.estimated_arrival_date = '';
            this.transport_id = 0;
            this.invoice_number = '';
            this.delivery_number = '';
            this.currency_id = 0;
            this.actual_shipping_costs = 0;
            this.sender_id = 0;
            this.user_id = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
