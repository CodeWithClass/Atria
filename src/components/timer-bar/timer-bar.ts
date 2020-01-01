import { Component, Input } from '@angular/core'

/**
 * Generated class for the TimerBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'timer-bar',
  templateUrl: 'timer-bar.html'
})
export class TimerBarComponent {
  @Input() outerColor = '#000'
  @Input() innerColor = '#fff'
  constructor() {}
}
