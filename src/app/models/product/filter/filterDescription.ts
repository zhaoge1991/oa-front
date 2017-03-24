export class FilterDescription {
    filter_description_id:number;
    filter_id: number;
    language_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    constructor(filterDescription) {
        if (filterDescription) {
            this.filter_description_id = filterDescription.filter_description_id;
            this.filter_id = filterDescription.filter_id;
            this.language_id = filterDescription.language_id;
            this.name = filterDescription.name;
            this.created_at = filterDescription.created_at;
            this.updated_at = filterDescription.updated_at;
        } else {
            this.filter_description_id = 0;
            this.filter_id = 0;
            this.language_id = 0;
            this.name = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
