import {User} from "../../user/user";
export class Announcement {
    announcement_id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    date_added: string;
    count_not_show: number;
    receive_users: User[];
    source_users: User[];
    not_receive_users: User[];
    constructor(announcement) {
        if (announcement) {
            this.announcement_id = announcement.announcement_id;
            this.name = announcement.name;
            this.count_not_show = announcement.count_not_show;

            this.description = announcement.description;
            this.created_at = announcement.created_at;
            this.updated_at = announcement.updated_at;
            this.date_added = announcement.date_added;
            this.receive_users = [];
            this.source_users = [];
            this.not_receive_users = [];
            for(let user of announcement.receive_users){
              this.receive_users.push(new User(user));
            };
            for(let user of announcement.source_users){
              this.source_users.push(new User(user));
            };
            for(let user of announcement.not_receive_users){
              this.not_receive_users.push(new User(user));
            };
        } else {
            this.announcement_id = 0;
            this.name = '';
            this.count_not_show = 0;
            this.description = '';
            this.created_at = '';
            this.updated_at = '';
            this.date_added = '';
            this.receive_users = [];
            this.source_users = [];
            this.not_receive_users = [];
        }

    }
}
