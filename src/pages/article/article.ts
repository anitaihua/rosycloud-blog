import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';


/**
 * Generated class for the ArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {

  public article:any;

  constructor(public navCtrl: NavController, private viewCtrl:ViewController, public navParams: NavParams) {
    this.article = this.navParams.data.article;
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('返回');
  }

}
