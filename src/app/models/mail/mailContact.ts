export class MailContact {
    contacts_id: number;
    user_id: number;
    contacts_name: string;
    contacts_email: string;
    created_at: string;
    updated_at: string;
    constructor(mailContact) {
        if (mailContact) {
            this.contacts_id = mailContact.contacts_id;
            this.user_id = mailContact.user_id;
            this.contacts_name = mailContact.contacts_name;
            this.contacts_email = mailContact.contacts_email;
            this.created_at = mailContact.created_at;
            this.updated_at = mailContact.updated_at;
        } else {
            this.contacts_id = 0;
            this.user_id = 0;
            this.contacts_name = '';
            this.contacts_email = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
