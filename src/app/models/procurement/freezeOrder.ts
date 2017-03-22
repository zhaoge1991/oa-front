export class FreezeOrder {
    procurement_freeze_id: number;
    procurement_freeze_no: string;
    date_added: string;
    user_id: number;
    user: any;
    status: number;
    products:any[];
    created_at: string;
    updated_at: string;
    
    constructor(freezeOrder) {
        if (freezeOrder) {
            this.procurement_freeze_id = freezeOrder.procurement_order_id;
            this.procurement_freeze_no = freezeOrder.procurement_freeze_no;
            this.date_added = freezeOrder.date_added;
            this.user_id = freezeOrder.user_id
            this.user = freezeOrder.user
            this.status = freezeOrder.status;
            this.products = freezeOrder.products;
            this.created_at = freezeOrder.created_at
            this.updated_at = freezeOrder.updated_at
            
        } else {
            this.procurement_freeze_id = 0;
            this.procurement_freeze_no = '';
            this.date_added = '';
            this.user_id = 0
            this.user = null;
            this.status = 0;
            this.products = []
            this.created_at = ''
            this.updated_at = ''
            
        }
    }
}