import {User} from "../user/user";
export class Comment {
    comment_id: number;
    parent_id: number;
    user_id: number;
    content: string;
    created_at: string;
    updated_at: string;
    able_id: number;
    able_type: string;
    user: User;
    constructor(comment) {
        if (comment) {
            this.comment_id = comment.comment_id;
            this.parent_id = comment.parent_id;
            this.user_id = comment.user_id;
            this.content = comment.content;
            this.created_at = comment.created_at;
            this.updated_at = comment.updated_at;
            this.able_id = comment.able_id;
            this.able_type = comment.able_type;
            this.user = new User(comment.user);
        } else {
            this.comment_id = 0;
            this.parent_id = 0;
            this.user_id = 0;
            this.content = '';
            this.created_at = '';
            this.updated_at = '';
            this.able_id = 0;
            this.able_type = '';
            this.user = new User(null);
        }

    }
}
