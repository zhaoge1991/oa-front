import {User} from "./../User";
export class OrderAnnex{
  annex_id: number;
  annexable_id: number;
  annexable_type: string;
  user_id: number;
  name: string;
  path: string;
  created_at: string;
  updated_at: string;
  original_extension: string;
  user: User;

  constructor(annex){
    this.annex_id = annex.annex_id;
    this.annexable_id = annex.annexable_id;
    this.annexable_type = annex.annexable_type;
    this.user_id = annex.user_id;
    this.name = annex.name;
    this.path = annex.path;
    this.created_at = annex.created_at;
    this.updated_at = annex.updated_at;
    this.original_extension = annex.original_extension;
    this.user = annex.user;
  }
}
