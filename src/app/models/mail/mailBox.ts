export class MailAttachment {
    mail_attachments_id: number;
    path: string;
    name: string;
    created_at: string;
    updated_at: string;
    constructor(mailAttachment) {
        if (mailAttachment) {
            this.mail_attachments_id = mailAttachment.mail_attachments_id;
            this.path = mailAttachment.path;
            this.name = mailAttachment.name;
            this.created_at = mailAttachment.created_at;
            this.updated_at = mailAttachment.updated_at;
        } else {
            this.mail_attachments_id = 0;
            this.path = '';
            this.name = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
