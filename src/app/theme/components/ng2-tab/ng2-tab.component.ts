import {
  Input,
  Component,
  ViewEncapsulation,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'ng2-tab',
  encapsulation: ViewEncapsulation.None,
  template: require('./ng2-tab.component.html'),
  styles: [require('./ng2-tab.scss')],
})
export class Ng2Tab {
  @Input('selected') selectedIndex: string;
  @Input('selected-index-class')
  selectedIndexClass: string = 'selected';
  @Input('selected-contents-class')
  selectedContentsClass: string = 'selected';
  @Input() tabconfig: any[];

  el: HTMLElement;
  indexEls:  HTMLElement[];
  contentsEls: HTMLElement[];

  constructor(private viewContainer: ViewContainerRef) {
    this.el = this.viewContainer.element.nativeElement;
  }

  ngAfterViewInit() {
    this.indexEls = [].slice.call(this.el.querySelectorAll('[index]'));
    this.contentsEls = [].slice.call(this.el.querySelectorAll('[contents]'));
    this.selectTab(this.selectedIndex);
    this.indexEls.forEach(el => {
      el.addEventListener('click', () => {
        this.selectTab(el.getAttribute('index'));
      })
    })
  }

  selectTab(id) {
    id = id || this.indexEls[0].getAttribute('index');

    this.indexEls.forEach(el => {
      this.removeClass(el, this.selectedIndexClass);
      if (el.getAttribute('index') == id) {
        this.addClass(el, this.selectedIndexClass);
      }
    })

    this.contentsEls.forEach(el => {
      el.style.display = 'none';
      this.removeClass(el, this.selectedContentsClass);
      if (el.getAttribute('contents') == id) {
        el.style.display = '';
        this.addClass(el, this.selectedContentsClass);
      }
    })

  }

  private addClass(el, str) {
    let classNames = (el.className ||'').split(' ');
    classNames.push(str);
    el.className = classNames.join(' ');
  }

  private removeClass(el, str) {
    el.className = (el.className ||'').replace(
      new RegExp('[ ]*'+ str), ''
    );
  }
}
