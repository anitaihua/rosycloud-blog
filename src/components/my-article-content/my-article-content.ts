import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ArticleContentItemPage } from '../../pages/article-content-item/article-content-item';

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

  constructor(private navCtrl: NavController) {
    console.log('Hello MyArticleContentComponent Component');
    this.text = 'Hello World';
  }

  removeArticleContent(index:number){

    this.articleContents.splice(index,1);

  }

  editArticleContentItem(articleContent:any){
    this.navCtrl.push(ArticleContentItemPage,articleContent);
  }

  addArticleContentItemByText(index:number){
    if(index>=0){
      this.articleContents.splice(index+1,0,{type:'text'});
    }else{
      this.articleContents.unshift({type:'text'});
    }
   
  }

  addArticleContentItemByImageOrVideo(index:number){
    if(index>=0){
      this.articleContents.splice(index+1,0,{type:'video'});
    }else{
      this.articleContents.unshift({type:'image'});
    }
  }

}
