import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { DiscoverPage } from "../pages/discover/discover";
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NoticeListPage } from '../pages/notice-list/notice-list';
import { ArticlePage } from '../pages/article/article';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CodePush } from '@ionic-native/code-push';
import { Keyboard } from '@ionic-native/keyboard';
import { AES256 } from '@ionic-native/aes-256';
import { SQLite } from '@ionic-native/sqlite';
import { JPush } from '@jiguang-ionic/jpush';

import { MyAlert } from '../providers/my-alert.service';
import { MyLoading } from '../providers/my-loading.service';
import { MyCodePush } from '../providers/my-codepush.service';
import { MyToast } from '../providers/my-toast.service';
import { UserInfo } from '../providers/user-info.service';
import { WebApi } from '../providers/web-api.service';
import { DBService } from '../providers/my-db.service';



import { ComponentsModule } from '../components/components.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { UpdatePopover } from './update.component';




@NgModule({
  declarations: [
    MyApp,
    DiscoverPage,
    ContactPage,
    HomePage,
    TabsPage,
    NoticeListPage,
    ArticlePage,
    UpdatePopover
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      platform:{
        ios:{
          backButtonText:'返回'
        }
      }
    }),
    ComponentsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DiscoverPage,
    ContactPage,
    HomePage,
    TabsPage,
    NoticeListPage,
    ArticlePage,
    UpdatePopover
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CodePush,
    AES256,
    SQLite,
    JPush,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Keyboard,
    ScreenOrientation,
    MyAlert,
    MyLoading,
    MyCodePush,
    MyToast,
    UserInfo,
    WebApi,
    DBService
  ]
})
export class AppModule {}
