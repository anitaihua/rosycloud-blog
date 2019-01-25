import { Component } from '@angular/core';
import { Events,NavController } from 'ionic-angular';

import { BaseListPage } from '../common/base-list';
import { MyLoading } from '../../providers/my-loading.service';
import { WebApi } from '../../providers/web-api.service';

import { ArticlePage } from '../article/article';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseListPage{

  constructor(private events:Events,private navCtrl: NavController,protected myLoading:MyLoading, private webApi:WebApi)  {
    super(myLoading);
  }

  ionViewDidLoad() {
    this.webApi.getUserInfo();
    this.pullNewList();
  }

   pullListImpl(){
    return this.webApi.getArticleList(this.page,this.limit);
  }

  /**
   * 跳转通知详情页
   * @param notice 通知
   */
  private gotoDetail(article:any){
    this.navCtrl.push(ArticlePage,{
      article:article
    });
  }

}
