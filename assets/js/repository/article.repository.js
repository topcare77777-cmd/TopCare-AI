/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Article Repository
 * ----------------------------------------------------------
 * Layer     : Data Access
 * Mode      : FULL REPLACEMENT
 * ==========================================================
 */

export default class ArticleRepository {
  constructor(cms) {
    this.api = cms.service('api');
  }

  async fetchById(id) {
    // Menggunakan API service yang di-inject via Facade
    return await this.api.get(`/articles/${id}`);
  }

  async save(data) {
    return await this.api.post('/articles/save', data);
  }
}