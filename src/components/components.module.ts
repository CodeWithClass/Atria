import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { SyncErrorComponent } from './sync-error/sync-error'
import { TimeTravelComponent } from './time-travel/time-travel'
import { RecommenderComponent } from './recommender/recommender'
import { RecommendationComponent } from './recommendation/recommendation'
import { TimerBarComponent } from './timer-bar/timer-bar'
@NgModule({
  declarations: [
    SyncErrorComponent,
    TimeTravelComponent,
    RecommendationComponent,
    RecommenderComponent,
    TimerBarComponent
  ],
  imports: [IonicPageModule.forChild(TimeTravelComponent)],
  exports: [
    SyncErrorComponent,
    TimeTravelComponent,
    RecommenderComponent,
    RecommendationComponent,
    TimerBarComponent
  ]
})
export class ComponentsModule {}
