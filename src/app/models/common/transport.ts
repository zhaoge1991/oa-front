export class Transport{
  transport_id: number;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
  fee_name: string;

  constructor(transport){
    if(transport){
      this.transport_id = transport.transport_id;
      this.name = transport.name;
      this.content = transport.content;
      this.created_at = transport.created_at;
      this.updated_at = transport.updated_at;
      this.fee_name = transport.fee_name;
    }
  }
}
