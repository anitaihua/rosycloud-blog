import { Component } from '@angular/core';

/**
 * Generated class for the MyArticleContentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-article-content',
  templateUrl: 'my-article-content.html'
})
export class MyArticleContentComponent {

  text: string;

  articleContents = [{type:'text'},{type:'image'},{type:'video'}];

  constructor() {
    console.log('Hello MyArticleContentComponent Component');
    this.text = 'Hello World';
  }

  removeArticleContent(){

  }

}
