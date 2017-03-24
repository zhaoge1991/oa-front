export class ProductDescription {
    product_description_id: number;
    product_id: number;
    language_id: number;
    name: string;
    description: string;
    tag: string;
    meta_title: string;
    meta_description: string;
    meta_keyword: string;
    short_title: string;
    created_at: string;
    updated_at: string;
    constructor(productDescription) {
        if (productDescription) {
            this.product_description_id = productDescription.product_description_id;
            this.product_id = productDescription.product_id;
            this.language_id = productDescription.language_id;
            this.name = productDescription.name;
            this.description = productDescription.description;
            this.tag = productDescription.tag;
            this.meta_title = productDescription.meta_title;
            this.meta_description = productDescription.meta_description;
            this.meta_keyword = productDescription.meta_keyword;
            this.short_title = productDescription.short_title;
            this.created_at = productDescription.created_at;
            this.updated_at = productDescription.updated_at;
        } else {
            this.product_description_id = 0;
            this.product_id = 0;
            this.language_id = 0;
            this.name = '';
            this.description = '';
            this.tag = '';
            this.meta_title = '';
            this.meta_description = '';
            this.meta_keyword = '';
            this.short_title = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
