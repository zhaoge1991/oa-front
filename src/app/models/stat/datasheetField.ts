export class DatasheetField {
    datasheet_field_id: number;
    datasheet_id: number;
    name: string;
    type: string;
    value: string;
    location: string;
    status: number;
    sort_order: string;
    column: string;
    created_at: string;
    updated_at: string;
    constructor(datasheetField) {
        if (datasheetField) {
            this.datasheet_field_id = datasheetField.datasheet_field_id;
            this.datasheet_id = datasheetField.datasheet_id;
            this.name = datasheetField.name;
            this.type = datasheetField.type;
            this.value = datasheetField.value;
            this.location = datasheetField.location;
            this.status = datasheetField.status;
            this.sort_order = datasheetField.sort_order;
            this.column = datasheetField.column;
            this.created_at = datasheetField.created_at;
            this.updated_at = datasheetField.updated_at;
        } else {
            this.datasheet_id = 0;
            this.name = '';
            this.type = '';
            this.value = '';
            this.location = '';
            this.status = 0;
            this.sort_order = datasheetField.sort_order;
            this.column = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
