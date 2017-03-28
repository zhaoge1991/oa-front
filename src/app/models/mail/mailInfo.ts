export class MailInfo {
    mail_info_id: number;
    user_id: number;
    mail_address_id: number;
    messageid: string;
    mail_send_email: string;
    mail_send_name: string;
    subject: string;
    charset: string;
    body: string;
    time: string;
    is_read: number;
    is_receive: number;
    receipt: number;
    notification: number;
    mailbox: string;
    created_at: string;
    updated_at: string;
    constructor(mailInfo) {
        if (mailInfo) {
            this.mail_info_id = mailInfo.mail_info_id;
            this.user_id = mailInfo.user_id;
            this.mail_address_id = mailInfo.mail_address_id;
            this.messageid = mailInfo.messageid;
            this.mail_send_email = mailInfo.mail_send_email;
            this.mail_send_name = mailInfo.mail_send_name;
            this.subject = mailInfo.subject;
            this.charset = mailInfo.charset;
            this.body = mailInfo.body;
            this.time = mailInfo.time;
            this.is_read = mailInfo.is_read;
            this.is_receive = mailInfo.is_receive;
            this.receipt = mailInfo.receipt;
            this.notification = mailInfo.notification;
            this.mailbox = mailInfo.mailbox;
            this.created_at = mailInfo.created_at;
            this.updated_at = mailInfo.updated_at;
        } else {
            this.mail_info_id = 0;
            this.user_id = 0;
            this.mail_address_id = 0;
            this.messageid = '';
            this.mail_send_email = '';
            this.mail_send_name = '';
            this.subject = '';
            this.charset = '';
            this.body = '';
            this.time = '';
            this.is_read = 0;
            this.is_receive = 0;
            this.receipt = 0;
            this.notification = 0;
            this.mailbox = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
