export class Zone {
    zone_id: number;
    country_id: number;
    name: string;
    code: string;
    status: number;
    created_at: string;
    updated_at: string;
    constructor(zone) {
        if (zone) {
            this.zone_id = zone.zone_id;
            this.country_id = zone.country_id;
            this.name = zone.name;
            this.code = zone.code;
            this.status = zone.status;
            this.created_at = zone.created_at;
            this.updated_at = zone.updated_at;
        } else {
            this.zone_id = 0;
            this.country_id = 0;
            this.name = '';
            this.code = '';
            this.status = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
