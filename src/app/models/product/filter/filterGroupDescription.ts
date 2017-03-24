export class FilterGroupDescription {
    filter_group_id:number;
    language_id: number;
    name: string;
    filter_group_description_id:number;
    created_at: string;
    updated_at: string;
    constructor(filterGroupDescription) {
        if (filterGroupDescription) {
            this.filter_group_id = filterGroupDescription.filter_group_id;
            this.language_id = filterGroupDescription.language_id;
            this.name = filterGroupDescription.name;
            this.filter_group_description_id = filterGroupDescription.filter_group_description_id;
            this.created_at = filterGroupDescription.created_at;
            this.updated_at = filterGroupDescription.updated_at;
        } else {
            this.filter_group_id = 0;
            this.language_id = 0;
            this.filter_group_description_id = 0;
            this.name = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
