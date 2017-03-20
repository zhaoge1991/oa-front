export class SaleUser{
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  employee_id: number;
  pivot: {
    customer_id: number,
    user_id: number
  }
}
