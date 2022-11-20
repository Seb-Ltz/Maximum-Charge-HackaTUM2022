import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() currentlyDisplaying: 'heatmap' | 'rangemap' = 'heatmap';
  @Output() currentlyDisplayingChange = new Subject<'heatmap' | 'rangemap'>();
  constructor() {}

  toggleDisplayed(current: 'heatmap' | 'rangemap') {
    this.currentlyDisplaying = current;
    this.currentlyDisplayingChange.next(current);
  }
}
