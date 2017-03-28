export class ProductPriceVar {
    product_price_var_id: number;
    val: string;
    product_price_id: number;
    val_remark: string;
    created_at: string;
    updated_at: string;
    constructor(productPriceVar) {
        if (productPriceVar) {
            this.product_price_var_id = productPriceVar.product_price_var_id;
            this.val = productPriceVar.val;
            this.product_price_id = productPriceVar.product_price_id;
            this.val_remark = productPriceVar.val_remark;
            this.created_at = productPriceVar.created_at;
            this.updated_at = productPriceVar.updated_at;
        } else {
            this.product_price_var_id = 0;
            this.val = '';
            this.product_price_id = 0;
            this.val_remark = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
