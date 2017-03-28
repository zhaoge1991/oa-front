export class MailAddress {
    mail_address_id: number;
    email: string;
    name: string;
    password: string;
    mailbox_id: number;
    sign_id: number;
    is_default: number;
    created_at: string;
    updated_at: string;
    constructor(mailAddress) {
        if (mailAddress) {
            this.mail_address_id = mailAddress.mail_address_id;
            this.email = mailAddress.email;
            this.name = mailAddress.name;
            this.password = mailAddress.password;
            this.mailbox_id = mailAddress.mailbox_id;
            this.sign_id = mailAddress.sign_id;
            this.is_default = mailAddress.is_default;
            this.created_at = mailAddress.created_at;
            this.updated_at = mailAddress.updated_at;
        } else {
            this.mail_address_id = 0;
            this.email = '';
            this.name = '';
            this.password = '';
            this.mailbox_id = 0;
            this.sign_id = 0;
            this.is_default = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
