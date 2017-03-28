export class Language {
    language_id: number;
    name: string;
    code: string;
    locale: string;
    image: string;
    directory: string;
    sort_order: number;
    status: number;
    created_at: string;
    updated_at: string;
    constructor(language) {
        if (language) {
            this.language_id = language.language_id;
            this.name = language.name;
            this.code = language.code;
            this.locale = language.locale;
            this.image = language.image;
            this.directory = language.directory;
            this.sort_order = language.sort_order;
            this.status = language.status;
            this.created_at = language.created_at;
            this.updated_at = language.updated_at;
        } else {
            this.language_id = 0;
            this.name = '';
            this.code = '';
            this.locale = '';
            this.image = '';
            this.directory = '';
            this.sort_order = 0;
            this.status = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
