export class Permission {
    id: number;
    name: string;
    display_name: string;
    description: string
    created_at: string;
    updated_at: string;

    constructor(permission) {
        if (permission) {
            this.id = permission.id;
            this.name = permission.name;
            this.display_name = permission.display_name;
            this.description = permission.description;
            this.created_at = permission.created_at;
            this.updated_at = permission.updated_at;
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
