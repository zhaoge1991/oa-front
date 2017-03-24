export class Annex {
    annex_id: number;
    user_id: number;
    name: string;
    path: string;
    original_extension: string;
    created_at: string;
    updated_at: string;
    constructor(annex) {
        if (annex) {
            this.annex_id = annex.annex_id;
            this.user_id = annex.user_id;
            this.name = annex.name;
            this.path = annex.path;
            this.original_extension = annex.original_extension;
            this.created_at = annex.created_at;
            this.updated_at = annex.updated_at;
        } else {
            this.annex_id = 0;
            this.user_id = 0;
            this.name = '';
            this.path = '';
            this.original_extension = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
