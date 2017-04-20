
import {User} from "../../user/user";
export class Opinion {
    opinion_id: number;
    name: string;
    opinion_type_id: number;
    opinion_date_id: number;
    description: string;
    created_at: string;
    updated_at: string;
    receive_users: User[];
    source_users: User[];
    constructor(opinion) {
        if (opinion) {
            this.opinion_id = opinion.opinion_id;
            this.name = opinion.name;
            this.opinion_type_id = opinion.opinion_type_id;
            this.opinion_date_id = opinion.opinion_date_id;
            this.description = opinion.description;
            this.created_at = opinion.created_at;
            this.updated_at = opinion.updated_at;
            this.receive_users = [];
            this.source_users = [];
            for(let user of opinion.receive_users){
              this.receive_users.push(new User(user));
            };
            for(let user of opinion.source_users){
              this.source_users.push(new User(user));
            };
        } else {
            this.opinion_id = 0;
            this.name = '';
            this.opinion_type_id = 0;
            this.opinion_date_id = 0;
            this.description = '';
            this.created_at = '';
            this.updated_at = '';
            this.receive_users = [];
            this.source_users = [];
        }

    }
}
