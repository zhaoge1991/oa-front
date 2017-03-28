export class ProductPriceVarDesc {
    product_price_var_desc_id: number;
    filters: string;
    product_price_var_id: number;
    price: number;
    name: string;
    created_at: string;
    updated_at: string;
    constructor(productPriceVarDesc) {
        if (productPriceVarDesc) {
            this.product_price_var_desc_id = productPriceVarDesc.product_price_var_desc_id;
            this.filters = productPriceVarDesc.filters;
            this.product_price_var_id = productPriceVarDesc.product_price_var_id;
            this.price = productPriceVarDesc.price;
            this.name = productPriceVarDesc.name;
            this.created_at = productPriceVarDesc.created_at;
            this.updated_at = productPriceVarDesc.updated_at;
        } else {
            this.product_price_var_desc_id = 0;
            this.filters = '';
            this.product_price_var_id = 0;
            this.price = 0;
            this.name = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
