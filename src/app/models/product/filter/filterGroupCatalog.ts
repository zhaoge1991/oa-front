export class FilterGroupCatalog {
    filter_group_catalog_id:number;
    name: string;
    created_at: string;
    updated_at: string;
    constructor(filterGroupCatalog) {
        if (filterGroupCatalog) {
            this.filter_group_catalog_id = filterGroupCatalog.filter_group_catalog_id;
            this.name = filterGroupCatalog.name;
            this.created_at = filterGroupCatalog.created_at;
            this.updated_at = filterGroupCatalog.updated_at;
        } else {
            this.filter_group_catalog_id = 0;
            this.name = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
