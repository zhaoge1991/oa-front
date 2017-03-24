export class OpinionDate {
    opinion_date_id: number;
    name: string;
    sort_order: number;
    color: string;
    created_at: string;
    updated_at: string;
    constructor(opinionDate) {
        if (opinionDate) {
            this.opinion_date_id = opinionDate.opinion_date_id;
            this.name = opinionDate.name;
            this.sort_order = opinionDate.sort_order;
            this.color = opinionDate.color;
            this.created_at = opinionDate.created_at;
            this.updated_at = opinionDate.updated_at;
        } else {
            this.opinion_date_id = 0;
            this.name = '';
            this.sort_order = 0;
            this.color = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
