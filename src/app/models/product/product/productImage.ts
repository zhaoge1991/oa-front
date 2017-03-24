export class ProductImage {
    product_image_id: number;
    product_id: number;
    image: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
    constructor(productImage) {
        if (productImage) {
            this.product_image_id = productImage.product_image_id;
            this.product_id = productImage.product_id;
            this.image = productImage.image;
            this.sort_order = productImage.sort_order;
            this.created_at = productImage.created_at;
            this.updated_at = productImage.updated_at;
        } else {
            this.product_image_id = 0;
            this.product_id = 0;
            this.image = '';
            this.sort_order = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
