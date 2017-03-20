import {SaleUser} from "./saleUser";
export class SaleAnnex{
  annex_id: number;
  annexable_id: number;
  annexable_type: string;
  user_id: number;
  name: string;
  path: string;
  created_at: string;
  updated_at: string;
  original_extension: string;
  user: SaleUser;
}
