export class Catalog {
    catalog_id: number;
    sort_order: number;
    entry_show: number;
    parent_id: number;
    image: string;
    index_tpl: string;
    list_tpl: string;
    info_tpl: string;
    catalog_urlrule: string;
    detail_urlrule: string;
    field: string;
    channel_id: number;
    top: number;
    status: number;
    packing_spec_id: number;
    created_at: string;
    updated_at: string;
    constructor(catalog) {
        if (catalog) {
            this.catalog_id = catalog.catalog_id;
            this.sort_order = catalog.sort_order;
            this.entry_show = catalog.entry_show;
            this.parent_id = catalog.parent_id;
            this.image = catalog.image;
            this.index_tpl = catalog.index_tpl;
            this.list_tpl = catalog.list_tpl;
            this.info_tpl = catalog.info_tpl;
            this.catalog_urlrule = catalog.catalog_urlrule;
            this.detail_urlrule = catalog.detail_urlrule;
            this.field = catalog.field;
            this.channel_id = catalog.channel_id;
            this.top = catalog.top;
            this.status = catalog.status;
            this.packing_spec_id = catalog.packing_spec_id;
            this.created_at = catalog.created_at;
            this.updated_at = catalog.updated_at;
        } else {
            this.catalog_id = 0;
            this.sort_order = 0;
            this.entry_show = 0;
            this.parent_id = 0;
            this.image = '';
            this.index_tpl = '';
            this.list_tpl = '';
            this.info_tpl = '';
            this.catalog_urlrule = '';
            this.detail_urlrule = '';
            this.field = '';
            this.channel_id = 0;
            this.top = 0;
            this.status = 0;
            this.packing_spec_id = 0;
            this.created_at = '';
            this.updated_at = '';
        }

    }
}
