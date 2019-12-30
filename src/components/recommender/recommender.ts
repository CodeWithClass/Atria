import { Component } from '@angular/core';

/**
 * Generated class for the RecommenderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recommender',
  templateUrl: 'recommender.html'
})
export class RecommenderComponent {

  text: string;

  constructor() {
    console.log('Hello RecommenderComponent Component');
    this.text = 'Hello World';
  }

}
