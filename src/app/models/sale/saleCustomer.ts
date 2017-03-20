import {SaleUser} from "./saleUser";

export class SaleCustomer{
  customer_id: number;
  customer_group_id: number;
  store_id: number;
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  fax: string;
  password: string;
  salt: string;
  company: string;
  website: string;
  newsletter: string;
  address: string;
  status: number;
  approved: number;
  token: string;
  date_added: string;
  created_at: string;
  updated_at: string;
  country_id: number;
  remarks: string;
  field_company: string;
  field_company_site: string;
  kh_zhuangtai: string;
  kh_dianhua: string;
  kh_dizhi: string;
  kh_leixing: string;
  kh_xunpan: string;
  kh_beizhu: string;
  kh_liushi: string;
  project_id: number;
  users: SaleUser[];
}
