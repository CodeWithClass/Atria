import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { SyncErrorComponent } from './sync-error/sync-error'
import { TimeTravelComponent } from './time-travel/time-travel'
@NgModule({
  declarations: [SyncErrorComponent, TimeTravelComponent],
  imports: [IonicPageModule.forChild(TimeTravelComponent)],
  exports: [SyncErrorComponent, TimeTravelComponent]
})
export class ComponentsModule {}
