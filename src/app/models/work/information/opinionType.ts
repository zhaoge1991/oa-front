export class OpinionType {
    opinion_type_id: number;
    name: string;
    sort_order: number;
    color: string;
    created_at: string;
    updated_at: string;
    constructor(opinionType) {
        if (opinionType) {
            this.opinion_type_id = opinionType.opinion_type_id;
            this.name = opinionType.name;
            this.sort_order = opinionType.sort_order;
            this.color = opinionType.color;
            this.created_at = opinionType.created_at;
            this.updated_at = opinionType.updated_at;
        } else {
            this.opinion_type_id = 0;
            this.name = '';
            this.sort_order = 0;
            this.color = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
