/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Personality Repository
 * ----------------------------------------------------------
 * Layer     : Data Access
 * Status    : MIGRATED
 * ==========================================================
 */

export default class PersonalityRepository {
  /**
   * @param {Object} cms - CMS Facade
   */
  constructor(cms) {
    // Service resolution melalui Facade v2.0.0
    this.api = cms.service('api');
  }

  /**
   * Fetch data kepribadian dari API
   * Kontrak API tetap sama sesuai Sprint 31B2
   */
  async fetchById(id) {
    return await this.api.get(`/personality/${id}`);
  }

  /**
   * Save data hasil tes
   */
  async save(data) {
    return await this.api.post('/personality/save', data);
  }
}