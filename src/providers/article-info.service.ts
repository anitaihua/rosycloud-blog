import { Injectable } from '@angular/core';
import { ArticleContent } from './article-content.service';

/**
 * 文章信息集合
 */
@Injectable()
export class ArticleInfo {
    
    public articleId: number;
    public articleTitle: string;
    public articleCover: string;
    public articleViews: number;
    public articleLikeCount: number;
    public articleCommentCount: number;
    public articleDate: Date;

    public aticleContents:Array<ArticleContent>;

    /**
     * 设置文章详情
     * @param data 详情信息
     */
    public setExtra(data: any) {

        this.articleId = data.articleId;
        this.articleTitle = data.articleTitle;
        this.articleCover = data.articleCover;
        this.articleViews = data.articleViews;
        this.articleLikeCount = data.articleLikeCount;
        this.articleCommentCount = data.articleCommentCount;

        
        data.aticleContents.array.forEach(element => {
            this.aticleContents.push(element);
        });
        
    }
}