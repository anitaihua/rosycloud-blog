import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';

import { BaseListPage } from '../common/base-list';
import { MyLoading } from '../../providers/my-loading.service';
import { WebApi } from '../../providers/web-api.service';


@Component({
  templateUrl: 'notice-list.html'
})
export class NoticeListPage extends BaseListPage {

  //通知类型
  private noticeType = 'myreceived';

  constructor(private events:Events,private navCtrl: NavController,protected myLoading:MyLoading, private webApi:WebApi) {
    super(myLoading);
  }

  ionViewDidLoad() {
    this.pullNewList();
  }

   pullListImpl(){
    return this.webApi.getNoticeList(this.noticeType,this.page,this.limit);
  }

  /**
   * 跳转通知详情页
   * @param notice 通知
   */
  private gotoDetail(notice:any){
    this.navCtrl.push(NoticeListPage,{
      noticeId:notice.id
    });
    //设置为已读
    if(this.noticeType == 'myreceive' && !notice.isRead){
      notice.isRead = true;
      this.events.publish('refresh:message');
    }
  }


}
