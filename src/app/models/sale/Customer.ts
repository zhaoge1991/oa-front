import {User} from "./User";

export class Customer{
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
  users: User[];

  constructor(customer){
    if(customer){
      this.customer_id = customer.customer_id;
      this.customer_group_id = customer.customer_group_id;
      this.store_id = customer.store_id;
      this.firstname = customer.firstname;
      this.lastname = customer.lastname;
      this.email = customer.email;
      this.telephone = customer.telephone;
      this.fax = customer.fax;
      this.password = customer.password;
      this.salt = customer.salt;
      this.company = customer.company;
      this.website = customer.website;
      this.newsletter = customer.newsletter;
      this.address = customer.address;
      this.status = customer.status;
      this.approved = customer.approved;
      this.token = customer.token;
      this.date_added = customer.date_added;
      this.created_at = customer.created_at;
      this.updated_at = customer.updated_at;
      this.country_id = customer.country_id;
      this.remarks = customer.remarks;
      this.field_company = customer.field_company;
      this.field_company_site = customer.field_company_site;
      this.kh_zhuangtai = customer.kh_zhuangtai;
      this.kh_dianhua = customer.kh_dianhua;
      this.kh_dizhi = customer.kh_dizhi;
      this.kh_leixing = customer.kh_leixing;
      this.kh_xunpan = customer.kh_xunpan;
      this.kh_beizhu = customer.kh_beizhu;
      this.kh_liushi = customer.kh_liushi;
      this.project_id = customer.project_id;
      this.users = [];
      for(let user of customer.users){
        this.users.push(new User(user))
      };
    }
  }
}
