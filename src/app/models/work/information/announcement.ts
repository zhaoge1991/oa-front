export class Announcement {
    announcement_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    constructor(announcement) {
        if (announcement) {
            this.announcement_id = announcement.announcement_id;
            this.name = announcement.name;

            this.description = announcement.description;
            this.created_at = announcement.created_at;
            this.updated_at = announcement.updated_at;
        } else {
            this.announcement_id = 0;
            this.name = '';
            this.description = '';
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
