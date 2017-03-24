export class Position {
    position_id: number;
    sort_order: number;
    name: string;
    created_at: string;
    updated_at: string;
    constructor(position) {
        if (position) {
            this.position_id = position.position_id;
            this.sort_order = position.sort_order;
            this.name = position.name;
            this.created_at = position.created_at;
            this.updated_at = position.updated_at;
        } else {
            this.position_id = 0;
            this.sort_order = 0;
            this.name = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
