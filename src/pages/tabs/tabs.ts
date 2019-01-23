import { Component } from '@angular/core';

import { DiscoverPage } from "../discover/discover";
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NoticeListPage } from '../notice-list/notice-list';
import { MyPage } from '../my/my';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DiscoverPage;
  tab3Root = ContactPage;
  tab4Root = NoticeListPage;
  tab5Root = MyPage;

  constructor() {

  }
  
}
