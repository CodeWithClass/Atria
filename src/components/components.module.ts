import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { SyncErrorComponent } from './sync-error/sync-error'
import { TimeTravelComponent } from './time-travel/time-travel'
import { RecommendationComponent } from './recommendation/recommendation'
import { TimerBarComponent } from './timer-bar/timer-bar'
@NgModule({
  declarations: [
    SyncErrorComponent,
    TimeTravelComponent,
    RecommendationComponent,
    TimerBarComponent
  ],
  imports: [IonicPageModule.forChild(TimeTravelComponent)],
  exports: [
    SyncErrorComponent,
    TimeTravelComponent,
    RecommendationComponent,
    TimerBarComponent
  ]
})
export class ComponentsModule {}
