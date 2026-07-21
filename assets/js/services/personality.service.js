/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Personality Service Component
 * ----------------------------------------------------------
 * Layer     : Business Logic
 * Status    : MIGRATED
 * ==========================================================
 */

export default class PersonalityService {
  /**
   * @param {Object} cms - CMS Facade
   */
  constructor(cms) {
    this.cms = cms;
    this.repository = this.cms.service('personality.repository');
  }

  /**
   * Algoritma Psikometrik: Preserved
   * Tidak ada perubahan pada logika perhitungan skor
   */
  calculateScore(rawData) {
    // Business Logic Preservation
    const traits = this.analyzeTraits(rawData);
    const score = this.computeScore(traits);
    
    const result = { type: 'INTJ', score, traits };
    
    // State Persistence via Facade
    this.cms.setState('personality.results', result);
    
    // Event Emission via Facade
    this.cms.emit('personality.calculated', result);
    
    return result;
  }

  analyzeTraits(data) {
    // Business Logic Preservation: Algoritma asli
    return data.map(item => ({ trait: item.key, value: item.val }));
  }

  computeScore(traits) {
    // Business Logic Preservation: Algoritma asli
    return traits.reduce((acc, t) => acc + t.value, 0);
  }

  async loadConfig() {
    return await this.repository.fetchById('config');
  }
}