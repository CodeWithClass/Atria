import { Injectable } from '@angular/core'
import { ComponentsModule } from '../../components/components.module'

@Injectable()
export class RecommenderProvider {
  constructor() {
    console.log('Hello RecommenderProvider Provider')
  }
}
