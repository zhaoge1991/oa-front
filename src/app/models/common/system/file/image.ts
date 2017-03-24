export class Image {
    image_id: number;
    md5: string;
    path: string;
    origina_name: string;
    created_at: string;
    updated_at: string;
    constructor(image) {
        if (image) {
            this.image_id = image.image_id;
            this.md5 = image.md5;
            this.path = image.path;
            this.origina_name = image.origina_name;
            this.created_at = image.created_at;
            this.updated_at = image.updated_at;
        } else {
            this.image_id = 0;
            this.md5 = '';
            this.path = '';
            this.origina_name = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
