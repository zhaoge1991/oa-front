export class Filter {
    filter_id: number;
    filter_group_id: number;
    sort_order: number;
    code: string;
    created_at: string;
    updated_at: string;
    constructor(filter) {
        if (filter) {
            this.filter_id = filter.filter_id;
            this.filter_group_id = filter.filter_group_id;
            this.sort_order = filter.sort_order;
            this.code = filter.code;
            this.created_at = filter.created_at;
            this.updated_at = filter.updated_at;
        } else {
            this.filter_id = 0;
            this.filter_group_id = 0;
            this.sort_order = 0;
            this.code = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
