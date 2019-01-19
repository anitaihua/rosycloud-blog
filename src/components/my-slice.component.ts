import { Component, Input } from '@angular/core';

/**
 * 条形二级菜单
 */
@Component({
    selector: 'my-slice',
    template: `
        <button ion-item>
            <ion-icon item-left name="{{icon}}" [style.color]="iconColor ? iconColor : '#5077aa'"></ion-icon>
            <span>{{text}}</span>
            <ion-icon ios="ios-arrow-forward" md="ios-arrow-forward" style="float: right; color: grey;"></ion-icon>
        </button>
    `
})
export class MySliceComponent {

    // 图标
    @Input() icon: string;
    // 图标颜色
    @Input() iconColor: string;
    // 文字
    @Input() text: string;
}