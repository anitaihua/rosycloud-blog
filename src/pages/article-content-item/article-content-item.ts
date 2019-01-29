import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the ArticleContentItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-content-item',
  templateUrl: 'article-content-item.html',
})
export class ArticleContentItemPage {

  private type:string;

  private articleContent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.type = this.navParams.get('type');
    this.articleContent = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleContentItemPage');
  }

  save(){
    let callback = this.navParams.get('callback');
    let data = {
      type: this.type
    };
    callback(data);
    this.navCtrl.pop();
  }

}
