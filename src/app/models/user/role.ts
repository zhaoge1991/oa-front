export class Role {
    id: number;
    name: string;
    display_name: string;
    description: string
    created_at: string;
    updated_at: string;

    constructor(role) {
        if (role) {
            this.id = role.id;
            this.name = role.name;
            this.display_name = role.display_name;
            this.description = role.description;
            this.created_at = role.created_at;
            this.updated_at = role.updated_at;
        } else {
            this.id = 0;
            this.name = '';
            this.display_name = '';
            this.description = '';
            this.created_at = '';
            this.updated_at = '';
        }
    }
}
