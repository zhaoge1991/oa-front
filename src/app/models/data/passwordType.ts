export class PasswordType {
    password_type_id: number;
    name: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
    constructor(passwordType) {
        if (passwordType) {
            this.password_type_id = passwordType.password_type_id;
            this.name = passwordType.name;
            this.sort_order = passwordType.sort_order;
            this.created_at = passwordType.created_at;
            this.updated_at = passwordType.updated_at;
        } else {
            this.password_type_id = 0;
            this.name = '';
            this.sort_order = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
