export class Password {
    password_id: number;
    name: string;
    account: string;
    password: string;
    website: string;
    expires: string;
    remark: string;
    type_id:number;
    deleted_at:string;
    created_at: string;
    updated_at: string;
    constructor(password) {
        if (password) {
            this.password_id = password.password_id;
            this.name = password.name;
            this.account = password.account;
            this.password = password.password;
            this.website = password.website;
            this.expires = password.expires;
            this.remark = password.remark;
            this.type_id = password.type_id;
            this.deleted_at = password.deleted_at;
            this.created_at = password.created_at;
            this.updated_at = password.updated_at;
        } else {
            this.password_id = 0;
            this.name = '';
            this.account = '';
            this.password = '';
            this.website = '';
            this.expires = '';
            this.remark = '';
            this.type_id = 0;
            this.deleted_at = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
