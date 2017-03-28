export class Degree {
    degree_id: number;
    level: number;
    name: string;
    created_at: string;
    updated_at: string;
    constructor(degree) {
        if (degree) {
            this.degree_id = degree.degree_id;
            this.level = degree.level;
            this.name = degree.name;
            this.created_at = degree.created_at;
            this.updated_at = degree.updated_at;
        } else {
            this.degree_id = 0;
            this.level = 0;
            this.name = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
