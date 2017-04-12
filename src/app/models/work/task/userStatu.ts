import {User} from "../../user/user";
import {TaskStatus} from "./taskStatus";

export class UserStatu {
  task_user_status_id: number;
  task_id: number;
  user_id: number;
  task_status_id: number;
  created_at: string;
  updated_at: string;
  description: string;
  user: User;
  task_status: TaskStatus;

  constructor(userstatu){
    if(userstatu){
      this.task_user_status_id = userstatu.task_user_status_id;
      this.task_id = userstatu.task_id;
      this.user_id = userstatu.user_id;
      this.task_status_id = userstatu.task_status_id;
      this.created_at = userstatu.created_at;
      this.updated_at = userstatu.updated_at;
      this.description = userstatu.description;
      this.user = new User(userstatu.user);
      this.task_status = new TaskStatus(userstatu.task_status);
    } else {
      this.task_user_status_id = 0;
      this.task_id = 0;
      this.user_id = 0;
      this.task_status_id = 0;
      this.created_at = '';
      this.updated_at = '';
      this.description = '';
      this.user = new User(null);
      this.task_status = new TaskStatus(null);
    }
  }
}
