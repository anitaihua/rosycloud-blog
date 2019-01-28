import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyImageCoverComponent } from '../../components/my-image-cover/my-image-cover';
import { DateService } from '../../providers/my-date.service';
import { MyArticleContentComponent } from '../../components/my-article-content/my-article-content';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild('myImageCoverComponent') myImageCoverComponent : MyImageCoverComponent;
  @ViewChild('myArticleContent') myArticleContent : MyArticleContentComponent;


  articleCover:string;

  articleTitle:string;

  constructor(public navCtrl: NavController,private dateService:DateService) {
    
  }

  publish(){
    this.articleTitle = this.myImageCoverComponent.getCoverTitle();
    //当未填写标题时候，日期填入
    if(this.articleTitle == ''){
      this.articleTitle = this.dateService.dateFormat('yyyy年MM月dd日',new Date());
    }
    
  }

}
