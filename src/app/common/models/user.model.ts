export interface UserModel{
  id?: number,
  name?: string,
  email?: string,
  created_at?: string,
  updated_at?: string,
  employee_id?: number,
  pivot: {
    order_id: number,
    user_id: number,
    processing_order_status: number,
    enable_order_status: number,
    processed_order_status: number,
    confirm_order_status: number,
    show_date: number
  }
}
