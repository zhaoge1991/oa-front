export class Country {
    country_id: number;
    name: string;
    iso_code_2: string;
    iso_code_3: string;
    address_format: string;
    postcode_required: number;
    status: number;
    created_at: string;
    updated_at: string;
    constructor(country) {
        if (country) {
            this.country_id = country.country_id;
            this.name = country.name;
            this.iso_code_2 = country.iso_code_2;
            this.iso_code_3 = country.iso_code_3;
            this.address_format = country.address_format;
            this.postcode_required = country.postcode_required;
            this.status = country.status;
            this.created_at = country.created_at;
            this.updated_at = country.updated_at;
        } else {
            this.country_id = 0;
            this.name = '';
            this.iso_code_2 = '';
            this.iso_code_3 = '';
            this.address_format = '';
            this.postcode_required = 0;
            this.status = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
