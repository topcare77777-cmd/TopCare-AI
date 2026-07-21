/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Article Service
 * ----------------------------------------------------------
 * Layer     : Business Logic
 * Mode      : FULL REPLACEMENT
 * ==========================================================
 */

export default class ArticleService {
  constructor(cms) {
    this.cms = cms;
  }

  async processArticle(id) {
    const repository = this.cms.service('article.repository');
    const article = await repository.fetchById(id);
    
    // Sinkronisasi state via Facade
    this.cms.setState('article.current', article);
    return article;
  }
}