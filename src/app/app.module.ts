import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FileTransfer } from '@ionic-native/file-transfer';

import { DiscoverPage } from "../pages/discover/discover";
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { NoticeListPage } from '../pages/notice-list/notice-list';
import { ArticlePage } from '../pages/article/article';
import { MyPage } from '../pages/my/my';
import { LoginPage } from '../pages/login/login';
import { UserInfoPage } from '../pages/user-info/user-info';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CodePush } from '@ionic-native/code-push';
import { Keyboard } from '@ionic-native/keyboard';
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
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
import { JpushProvider } from '../providers/my-jpush.service';



import { ComponentsModule } from '../components/components.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { UpdatePopover } from './update.component';
import { SettingPage } from '../pages/setting/setting';
import { UserInfoIntroductionPage } from '../pages/user-info/user-info-introduction';
import { DirectivesModule } from '../directives/directives.module';
import { UserInfoNickNamePage } from '../pages/user-info/user-info-nick-name';





@NgModule({
  declarations: [
    MyApp,
    DiscoverPage,
    ContactPage,
    HomePage,
    TabsPage,
    NoticeListPage,
    ArticlePage,
    MyPage,
    LoginPage,
    UserInfoPage,
    SettingPage,
    UserInfoIntroductionPage,
    UserInfoNickNamePage,
    UpdatePopover
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:'',
      tabsHideOnSubPages: 'true' //隐藏全部子页面tabs
    }),
    ComponentsModule,
    DirectivesModule,
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
    MyPage,
    LoginPage,
    UserInfoPage,
    SettingPage,
    UserInfoIntroductionPage,
    UserInfoNickNamePage,
    UpdatePopover
  ],
  providers: [
    FileTransfer,
    StatusBar,
    SplashScreen,
    CodePush,
    Camera,
    PhotoViewer,
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
    DBService,
    JpushProvider
  ]
})
export class AppModule {}
