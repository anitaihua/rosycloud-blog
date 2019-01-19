import { NgModule } from '@angular/core';
import { MySliceComponent } from './my-slice.component';
import { MyImagePickerComponent } from './my-image-picker.component';
import { MyInfiniteComponent,MyRefresherComponent } from './my-list.component';


import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
@NgModule({
	declarations: [MySliceComponent,
	MyImagePickerComponent,
	MyInfiniteComponent,
	MyRefresherComponent
	],
	imports: [BrowserModule,HttpModule,IonicModule],
	exports: [MySliceComponent,
	MyImagePickerComponent,
	MyInfiniteComponent,
	MyRefresherComponent
	]
})
export class ComponentsModule {}
