export class ProductModelGenerate {
    product_model_generate_id: number;
    model_template: string;
    catalog_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    constructor(productModelGenerate) {
        if (productModelGenerate) {
            this.product_model_generate_id = productModelGenerate.product_model_generate_id;
            this.model_template = productModelGenerate.model_template;
            this.catalog_id = productModelGenerate.catalog_id;
            this.name = productModelGenerate.name;
            this.created_at = productModelGenerate.created_at;
            this.updated_at = productModelGenerate.updated_at;
        } else {
            this.product_model_generate_id = 0;
            this.catalog_id = 0;
            this.model_template = '';
            this.name = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
