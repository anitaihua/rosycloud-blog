import { Injectable } from '@angular/core';

/**
 * 文章内容信息集合
 */
@Injectable()
export class ArticleContent {
    
    public contentId: number;
    public typeId: number;
    public contentUrl: string;
    public contentText: string;
    public contentImgUrl: string;

    public order:number;


    /**
     * 设置文章内容详情
     * @param data 详情信息
     */
    public setExtra(data: any) {
        
    }
}