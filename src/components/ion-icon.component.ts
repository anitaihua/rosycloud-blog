import { Component, Input } from '@angular/core';

/**
 * 条形二级菜单
 */
@Component({
    selector: 'ion-icon',
    template: `<ion-icon name="{{name}}" md={{md}} ios={{ios}} style="{{style}}" ></ion-icon>`
})
export class IonIconComponent {

    // 图标
    @Input() name: string;
    // 图标颜色
    @Input() md: string;
    // 文字
    @Input() ios: string;
    //样式
    @Input() style: string;
}