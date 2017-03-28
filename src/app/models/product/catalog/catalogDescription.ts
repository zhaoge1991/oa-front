export class CatalogDescription {
    catalog_description_id: number;
    catalog_id: number;
    language_id: number;
    name: string;
    meta_keyword: string;
    meta_description: string;
    description: string;
    title: string;
    created_at: string;
    updated_at: string;
    constructor(catalogDescription) {
        if (catalogDescription) {
            this.catalog_description_id = catalogDescription.catalog_description_id;
            this.catalog_id = catalogDescription.catalog_id;
            this.language_id = catalogDescription.language_id;
            this.name = catalogDescription.name;
            this.meta_keyword = catalogDescription.meta_keyword;
            this.meta_description = catalogDescription.meta_description;
            this.description = catalogDescription.description;
            this.title = catalogDescription.title;
            this.created_at = catalogDescription.created_at;
            this.updated_at = catalogDescription.updated_at;
        } else {
            this.catalog_description_id = 0;
            this.catalog_id = 0;
            this.language_id = 0;
            this.name = '';
            this.meta_keyword = '';
            this.meta_description = '';
            this.description = '';
            this.title = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
