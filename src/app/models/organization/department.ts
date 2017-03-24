export class Department {
    department_id: number;
    parent_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    constructor(department) {
        if (department) {
            this.department_id = department.department_id;
            this.parent_id = department.parent_id;
            this.name = department.name;
            this.created_at = department.created_at;
            this.updated_at = department.updated_at;
        } else {
            this.department_id = 0;
            this.parent_id = 0;
            this.name = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
