export class Employee {
    employee_id: number;
    number: number;
    name_cn: string;
    name_en: string;
    position: string;
    department_id: number;
    telephone: number;
    email: string;
    gender: number;
    ethnic: string;
    education: string;
    science: string;
    birthday: string;
    identity: string;
    province: string;
    city: string;
    address: string;
    hiredate: string;
    dimission: string;
    contract_start: string;
    contract_end: string;
    remark: string;
    user_id: number;
    identity_address: string;
    degree_id: number;
    created_at: string;
    updated_at: string;
    constructor(employee) {
        if (employee) {
            this.employee_id = employee.employee_id;
            this.number = employee.number;
            this.name_cn = employee.name_cn;
            this.name_en = employee.name_en;
            this.position = employee.position;
            this.department_id = employee.department_id;
            this.telephone = employee.telephone;
            this.email = employee.email;
            this.gender = employee.gender;
            this.ethnic = employee.ethnic;
            this.education = employee.education;
            this.science = employee.science;
            this.birthday = employee.birthday;
            this.identity = employee.identity;
            this.province = employee.province;
            this.city = employee.city;
            this.address = employee.address;
            this.hiredate = employee.hiredate;
            this.dimission = employee.dimission;
            this.contract_start = employee.contract_start;
            this.contract_end = employee.contract_end;
            this.remark = employee.remark;
            this.user_id = employee.user_id;
            this.identity_address = employee.identity_address;
            this.degree_id = employee.degree_id;
            this.created_at = employee.created_at;
            this.updated_at = employee.updated_at;
        } else {
            this.employee_id = 0;
            this.number = 0;
            this.name_cn =  '';
            this.name_en =  '';
            this.position =  '';
            this.department_id = 0;
            this.telephone = 0;
            this.email =  '';
            this.gender = 0;
            this.ethnic =  '';
            this.education =  '';
            this.science =  '';
            this.birthday =  '';
            this.identity =  '';
            this.province =  '';
            this.city =  '';
            this.address =  '';
            this.hiredate =  '';
            this.dimission =  '';
            this.contract_start =  '';
            this.contract_end =  '';
            this.remark =  '';
            this.user_id = 0;
            this.identity_address =  '';
            this.degree_id = 0;
            this.created_at =  '';
            this.updated_at =  '';
        }

    }
}
