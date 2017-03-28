export class CustomerInfo {
    customer_info_id: number;
    customer_id: number;
    info_name: string;
    info_value: string;
    created_at: string;
    updated_at: string;
    constructor(info) {
        if (info) {
            this.customer_info_id = info.customer_info_id;
            this.customer_id = info.customer_id;
            this.info_name = info.info_name;
            this.info_value = info.info_value;
            this.created_at = info.created_at;
            this.updated_at = info.updated_at;
        } else {
            this.customer_info_id = 0;
            this.customer_id = 0;
            this.info_name = '';
            this.info_value = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
