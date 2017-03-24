export class ProductPrice {
    product_price_id: number;
    name: string;
    formula: string;
    catalog_id: number;
    formula_remark: string;
    created_at: string;
    updated_at: string;
    constructor(productPrice) {
        if (productPrice) {
            this.product_price_id = productPrice.product_price_id;
            this.name = productPrice.name;
            this.formula = productPrice.formula;
            this.catalog_id = productPrice.catalog_id;
            this.formula_remark = productPrice.formula_remark;
            this.created_at = productPrice.created_at;
            this.updated_at = productPrice.updated_at;
        } else {
            this.product_price_id = 0;
            this.name = '';
            this.catalog_id = 0;
            this.formula = '';
            this.formula_remark = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
