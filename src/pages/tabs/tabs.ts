import { Component } from '@angular/core';

import { DiscoverPage } from "../discover/discover";
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NoticeListPage } from '../notice-list/notice-list';
import { MyPage } from '../my/my';
import { Events, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { WebApi } from '../../providers/web-api.service';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tab1Root = HomePage;
  tab2Root = DiscoverPage;
  tab3Root = ContactPage;
  tab4Root = NoticeListPage;
  tab5Root = MyPage;

  defaultTabNum = 1;

  tabMsgNum;

  constructor(private navCtrl: NavController,private events: Events,private webApi:WebApi,private navParams: NavParams) {
    let tabsNum = navParams.get('tabsNum');

    if(tabsNum){
      this.defaultTabNum = tabsNum;
    }
    
    events.subscribe('token:expired', (data) => {
      
      let userListUrl = this.webApi.getUserListUrl();
      if(userListUrl != data){
        this.navCtrl.push(LoginPage); 
      }
      
    });
    events.subscribe('tabBadge:num', (data) => {
      
      this.tabMsgNum = data;
      
    });
  }

  ionViewDidEnter(){

  }

  goArticlePage(){
    console.log(218678665);
  }
  
}
