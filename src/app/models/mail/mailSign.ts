export class MailSign {
    sign_id: number;
    user_id: number;
    mail_address_id: number;
    sign_name: string;
    sign_content: string;
    created_at: string;
    updated_at: string;
    constructor(mailSign) {
        if (mailSign) {
            this.sign_id = mailSign.sign_id;
            this.user_id = mailSign.user_id;
            this.mail_address_id = mailSign.mail_address_id;
            this.sign_name = mailSign.sign_name;
            this.sign_content = mailSign.sign_content;
            this.created_at = mailSign.created_at;
            this.updated_at = mailSign.updated_at;
        } else {
            this.sign_id = 0;
            this.user_id = 0;
            this.mail_address_id = 0;
            this.sign_name = '';
            this.sign_content = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
