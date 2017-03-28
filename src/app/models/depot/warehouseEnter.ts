export class WarehouseEnter {
    warehouse_enter_id: number;
    warehouse_enter_no: string;
    enter_date: string;
    user_id: number;
    procurement_order_id: number;
    price: number;
    remark: string;
    created_at: string;
    updated_at: string;
    constructor(enter) {
        if (enter) {
            this.warehouse_enter_id = enter.warehouse_enter_id;
            this.warehouse_enter_no = enter.warehouse_enter_no;
            this.enter_date = enter.enter_date;
            this.user_id = enter.user_id;
            this.procurement_order_id = enter.procurement_order_id;
            this.price = enter.price;
            this.remark = enter.remark;
            this.created_at = enter.created_at;
            this.updated_at = enter.updated_at;
        } else {
            this.warehouse_enter_id = 0;
            this.warehouse_enter_no = '';
            this.enter_date = '';
            this.user_id = 0;
            this.procurement_order_id = 0;
            this.price = 0;
            this.remark = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
