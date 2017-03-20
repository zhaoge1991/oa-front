import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Paginate} from "../../../../models/common/paginate";

@Component({
    selector: 'pages-button',
    templateUrl: './pagesbutton.html',
    styleUrls: ['./pages.scss']
})
export class PagesButtonComponent {
    @Input() paginate: Paginate;
    @Output() pageClick = new EventEmitter();

    turnpage(pages: any) {
        if (pages === 'first') {
            this.pageClick.emit({text: 1});
        } else if (pages === 'last') {
            this.pageClick.emit({text: this.paginate.last_page});
        } else {
            this.pageClick.emit({text: this.paginate.current_page + pages});
        }
    }

    pageInputUp($event) {
        let val = $event.target.value.replace(/[^0-9]/g, '');
        if ((val - 0) > this.paginate.last_page) {
            $event.target.value = this.paginate.last_page;
        } else {$event.target.value = val;}
        let page: number = $event.target.value - 0;
        if ($event.keyCode === 13 && page != 0) {
            this.pageClick.emit({text: page});
            $event.target.value = '';
        }

    }
}
