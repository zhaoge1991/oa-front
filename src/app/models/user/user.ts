export class User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    employee_id: number;
    constructor(user) {
        if (user) {
            this.id = user.id;
            this.name = user.name;
            this.email = user.email;
            this.created_at = user.created_at;
            this.updated_at = user.updated_at;
            this.employee_id = user.employee_id;
        } else {
            this.id = 0;
            this.name = '';
            this.email = '';
            this.created_at = '';
            this.updated_at = '';
            this.employee_id = 0;
        }

    }
}
