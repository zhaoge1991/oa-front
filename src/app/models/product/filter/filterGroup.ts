export class FilterGroup {
    filter_group_id: number;
    sort_order: number;
    filter_group_catalog_id: number;
    created_at: string;
    updated_at: string;
    constructor(filterGroup) {
        if (filterGroup) {
            this.filter_group_id = filterGroup.filter_group_id;
            this.sort_order = filterGroup.sort_order;
            this.filter_group_catalog_id = filterGroup.filter_group_catalog_id;
            this.created_at = filterGroup.created_at;
            this.updated_at = filterGroup.updated_at;
        } else {
            this.filter_group_id = 0;
            this.sort_order = 0;
            this.filter_group_catalog_id = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
