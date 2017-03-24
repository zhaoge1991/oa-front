export class MailCc {
    mail_cc_id: number;
    mail_info_id: number;
    cc_email: string;
    cc_name: string;
    created_at: string;
    updated_at: string;
    constructor(mailCc) {
        if (mailCc) {
            this.mail_cc_id = mailCc.mail_cc_id;
            this.mail_info_id = mailCc.mail_info_id;
            this.cc_email = mailCc.cc_email;
            this.cc_name = mailCc.cc_name;
            this.created_at = mailCc.created_at;
            this.updated_at = mailCc.updated_at;
        } else {
            this.mail_cc_id = 0;
            this.mail_info_id = 0;
            this.cc_email = '';
            this.cc_name = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
