export class DatasheetFieldValue {
    datasheet_field_value_id: number;
    datasheet_field_id: number;
    name: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
    constructor(datasheetFieldValue) {
        if (datasheetFieldValue) {
            this.datasheet_field_value_id = datasheetFieldValue.datasheet_field_value_id;
            this.datasheet_field_id = datasheetFieldValue.datasheet_field_id;
            this.name = datasheetFieldValue.name;
            this.sort_order = datasheetFieldValue.sort_order;
            this.created_at = datasheetFieldValue.created_at;
            this.updated_at = datasheetFieldValue.updated_at;
        } else {
            this.datasheet_field_value_id = 0;
            this.datasheet_field_id = 0;
            this.name = '';
            this.sort_order = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
