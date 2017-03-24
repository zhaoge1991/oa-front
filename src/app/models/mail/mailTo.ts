export class MailTo {
    mail_to_id: number;
    mail_info_id: number;
    to_name: string;
    to_email: string;
    created_at: string;
    updated_at: string;
    constructor(mailTo) {
        if (mailTo) {
            this.mail_to_id = mailTo.mail_to_id;
            this.mail_info_id = mailTo.mail_info_id;
            this.to_name = mailTo.to_name;
            this.to_email = mailTo.to_email;
            this.created_at = mailTo.created_at;
            this.updated_at = mailTo.updated_at;
        } else {
            this.mail_to_id = 0;
            this.mail_info_id = 0;
            this.to_name = '';
            this.to_email = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
