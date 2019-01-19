import { Component } from '@angular/core';

/**
 * 下拉刷新
 */
@Component({
    selector: '[my-refresher]',
    template: `
        <ion-refresher-content pullingText="下拉刷新" refreshingText="刷新中..."></ion-refresher-content>
    `
})
export class MyRefresherComponent { }

/**
 * 上拉加载
 */
@Component({
    selector: '[my-infinite]',
    template: `
        <ion-infinite-scroll-content loadingText="加载中..."></ion-infinite-scroll-content>
    `
})
export class MyInfiniteComponent { }