export class Datasheet {
    datasheet_id: number;
    name: string;
    type: string;
    created_at: string;
    updated_at: string;
    constructor(datasheet) {
        if (datasheet) {
            this.datasheet_id = datasheet.datasheet_id;
            this.name = datasheet.name;

            this.type = datasheet.type;
            this.created_at = datasheet.created_at;
            this.updated_at = datasheet.updated_at;
        } else {
            this.datasheet_id = 0;
            this.name = '';
            this.type = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
