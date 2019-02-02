import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { MyAlert } from '../../providers/my-alert.service';

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

  @ViewChild(Navbar) navBar: Navbar;

  private type:string;

  private articleContent;

  private contentText:string;

  readyText:string;

  constructor(
    public navCtrl: NavController,
    private myAlert: MyAlert,
     public navParams: NavParams
     ) {
    this.type = this.navParams.get('type');
    this.articleContent = this.navParams.data;
    this.readyText = this.navParams.get('contentText');
    this.contentText = this.navParams.get('contentText');
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = this.backButtonClick;
  }

  backButtonClick = (e: UIEvent) => {

    if(this.readyText && this.readyText.length && this.contentText != this.readyText){
      this.myAlert.showConfirms('是否保存修改内容?',()=>{
        this.navCtrl.pop();
      },()=>{
        this.save();
      });
    }else{
      this.navCtrl.pop();
    }
    
}

  onChangeText(value:string){

  }

  save(){
    let callback = this.navParams.get('callback');
    let data = {
      type: this.type,
      contentText:this.readyText
    };
    if(callback){
      callback(data);
    }
    this.navCtrl.pop();
  }

}
