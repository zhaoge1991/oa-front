export class CatalogFilterGroupDescription{
  filter_group_id: number;
  language_id: number;
  name: string;
  filter_group_description_id: number;
  created_at: string;
  updated_at: string;

  constructor(description){
    if(description){
      this.filter_group_id = description.filter_group_id;
      this.language_id = description.language_id;
      this.name = description.name;
      this.filter_group_description_id = description.filter_group_description_id;
      this.created_at = description.created_at;
      this.updated_at = description.updated_at;
    } else {
      this.filter_group_id = null;
      this.language_id = null;
      this.name = null;
      this.filter_group_description_id = null;
      this.created_at = null;
      this.updated_at = null;
    }
  }
}
