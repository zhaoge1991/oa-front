export class CommentReply {
    comment_reply_id: number;
    comment_id: number;
    user_id: number;
    content: string;
    created_at: string;
    updated_at: string;
    constructor(commentReply) {
        if (commentReply) {
            this.comment_reply_id = commentReply.comment_reply_id;
            this.comment_id = commentReply.comment_id;
            this.user_id = commentReply.user_id;
            this.content = commentReply.content;
            this.created_at = commentReply.created_at;
            this.updated_at = commentReply.updated_at;
        } else {
            this.comment_reply_id = 0;
            this.comment_id = 0;
            this.user_id = 0;
            this.content = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
