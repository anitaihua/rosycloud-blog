import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BaseListPage } from '../common/base-list';

import { MyLoading } from '../../providers/my-loading.service';
import { WebApi } from '../../providers/web-api.service';

@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html'
})
export class DiscoverPage extends BaseListPage {

  

  //信息类型
  private infoType = 'recommend';

  private infoList = [{
    title:'加拿大鹅北京销售火爆说明了什么？',
    des:'加拿大鹅北京销售火爆说明了加拿大鹅北京销售火爆加拿大鹅北京销售火爆...',
    realName:'清风微评',
    msgNum:66,
    liked:100,
    isImage: true,
    url:'/assets/imgs/item-img.png'
  },{
    title:'加拿大鹅北京销售火爆说明了什么？',
    des:'加拿大鹅北京销售火爆说明了加拿大鹅北京销售火爆说明了加拿大鹅北京销售火爆说明了加拿大鹅北京销售火爆说明了',
    realName:'大哥点评',
    msgNum:69,
    liked:160,
    isImage: false,
    url:''
  },{
    title:'加拿大鹅北京销售火爆说明了什么？',
    des:'加拿大鹅北京销售火爆说明了加拿大鹅北京销售火爆加拿大鹅北京销售火爆...',
    realName:'清风微评',
    msgNum:66,
    liked:100,
    isImage: true,
    url:'/assets/imgs/item-img.png'
  },{
    title:'加拿大鹅北京销售火爆说明了什么？',
    des:'加拿大鹅北京销售火爆说明了加拿大鹅北京销售火爆说明了加拿大鹅北京销售火爆说明了加拿大鹅北京销售火爆说明了',
    realName:'大哥点评',
    msgNum:69,
    liked:160,
    isImage: false,
    url:''
  },{
    title:'加拿大鹅北京销售火爆说明了什么？',
    des:'加拿大鹅北京销售火爆说明了加拿大鹅北京销售火爆加拿大鹅北京销售火爆...',
    realName:'清风微评',
    msgNum:66,
    liked:100,
    isImage: true,
    url:'/assets/imgs/item-img.png'
  },{
    title:'加拿大鹅北京销售火爆说明了什么？',
    des:'加拿大鹅北京销售火爆说明了加拿大鹅北京销售火爆说明了加拿大鹅北京销售火爆说明了加拿大鹅北京销售火爆说明了',
    realName:'大哥点评',
    msgNum:69,
    liked:160,
    isImage: false,
    url:''
  }];

  constructor(private navCtrl: NavController,protected myLoading:MyLoading, private webApi:WebApi) {
    super(myLoading);
    
  }

  ionViewDidLoad() {
    this.pullNewList();
  }
  pullListImpl(){
    return this.webApi.getArticleList(this.page,this.limit);
  }

}
