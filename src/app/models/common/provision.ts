export class Provision{
  provision_id: number;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;

  constructor(provision) {
    if (provision) {
      this.provision_id = provision.provision_id
      this.name = provision.name
      this.content = provision.content
      this.created_at = provision.created_at
      this.updated_at = provision.updated_at
    }
  }
}
