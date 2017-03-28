export class ProductUploadRecord {
    product_upload_record_id: number;
    product_min_id: number;
    product_max_id: number;
    path: string;
    filename: string;
    user_id: number;
    delete_user_id: number;
    created_at: string;
    updated_at: string;
    constructor(productPrice) {
        if (productPrice) {
            this.product_upload_record_id = productPrice.product_upload_record_id;
            this.product_min_id = productPrice.product_min_id;
            this.product_max_id = productPrice.product_max_id;
            this.path = productPrice.path;
            this.filename = productPrice.filename;
            this.user_id = productPrice.user_id;
            this.delete_user_id = productPrice.delete_user_id;
            this.created_at = productPrice.created_at;
            this.updated_at = productPrice.updated_at;
        } else {
            this.product_upload_record_id = 0;
            this.product_min_id = 0;
            this.product_max_id = 0;
            this.path = '';
            this.user_id = 0;
            this.filename = '';
            this.delete_user_id = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
