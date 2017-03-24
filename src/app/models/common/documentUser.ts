export class DocumentUser {
    document_user_id: number;
    router: string;
    content: string;
    created_at: string;
    updated_at: string;
    constructor(documentUser) {
        if (documentUser) {
            this.document_user_id = documentUser.document_user_id;
            this.router = documentUser.router;
            this.content = documentUser.content;
            this.created_at = documentUser.created_at;
            this.updated_at = documentUser.updated_at;
        } else {
            this.document_user_id = 0;
            this.router = '';
            this.content = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
