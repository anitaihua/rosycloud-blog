import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Keyboard } from '@ionic-native/keyboard';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { MyCodePush} from '../providers/my-codepush.service'

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private screenOrientation: ScreenOrientation,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private myCodePush: MyCodePush
  ) {
    this.platform.ready().then(() => {
      if(this.platform.is('cordova')){
        this.splashScreen.hide();
        this.statusBar.styleLightContent();
        this.statusBar.backgroundColorByHexString('#5077aa');
        this.screenOrientation.lock('portrait');
        this.keyboard.hideFormAccessoryBar(false);

        //发起热更新
        this.myCodePush.hotUpdate();
      }
    });

    //后台唤醒
    this.platform.resume.subscribe(()=>{
      //发起热更新
      this.myCodePush.hotUpdate();
    });
    
  }
}
