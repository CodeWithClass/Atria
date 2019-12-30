import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { SyncErrorComponent } from './sync-error/sync-error'
import { TimeTravelComponent } from './time-travel/time-travel'
import { RecommendationComponent } from './recommendation/recommendation'
import { RecommenderComponent } from './recommender/recommender';
@NgModule({
  declarations: [
    SyncErrorComponent,
    TimeTravelComponent,
    RecommendationComponent,
    RecommenderComponent
  ],
  imports: [IonicPageModule.forChild(TimeTravelComponent)],
  exports: [SyncErrorComponent, TimeTravelComponent, RecommendationComponent,
    RecommenderComponent]
})
export class ComponentsModule {}
