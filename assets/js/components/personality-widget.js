/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Personality Widget Component
 * ----------------------------------------------------------
 * Layer     : UI Component (Widget)
 * Status    : MIGRATED
 * ==========================================================
 */

export default class PersonalityWidget {
  /**
   * @param {HTMLElement} container 
   * @param {Object} cms - CMS Facade
   */
  constructor(container, cms) {
    this.container = container;
    this.cms = cms;
    this.boundHandleUpdate = this.handleUpdate.bind(this);
  }

  init() {
    // Registrasi listener via Facade
    this.cms.on('personality.calculated', this.boundHandleUpdate);
  }

  handleUpdate(data) {
    // Renderer diakses via Service/Module (di-inject saat mount)
    if (this.renderer) {
      this.renderer.render(this.container, data);
    }
  }

  /**
   * Memory Leak Prevention:
   * Membersihkan event listener secara eksplisit saat widget dihancurkan
   */
  destroy() {
    this.cms.off('personality.calculated', this.boundHandleUpdate);
    this.container.innerHTML = '';
    this.container = null;
  }
}