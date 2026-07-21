/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Article Module Component
 * ----------------------------------------------------------
 * File      : assets/js/modules/article.module.js
 * Version   : 2.0.0
 * Layer     : Modules Logic
 * 
 * References:
 * - docs/Kernel-Architecture.md (Bab 4.3: Dependency Inversion)
 * - docs/Kernel-API.md          (Bab 5: CMS Facade Integration)
 *
 * Status:
 * LOCKED CONTRACT IMPLEMENTATION — FULL REPLACE
 * ==========================================================
 */

import BaseModule from './base.module.js';

/**
 * ArticleModule menangani lifecycle artikel, integrasi data,
 * dan komunikasi UI via CMS Facade.
 */
export default class ArticleModule extends BaseModule {
  
  constructor(cmsInstance) {
    super('article', '2.0.0', cmsInstance);
  }

  /**
   * Tahap Inisialisasi: Sinkronisasi Service & Registry
   */
  async init() {
    await super.init();
    // Migrasi dari container.get('data.engine') ke cms.service()
    this.repository = this.cms.service('article.repository');
    return this;
  }

  /**
   * Tahap Booting: Event wiring
   */
  async boot() {
    await super.boot();
    
    // Migrasi dari legacyEvents ke cms.on
    this.cms.on('article.save', (payload) => this.handleSave(payload));
    return this;
  }

  /**
   * Tahap Mounting: Rendering
   */
  async mount(container) {
    await super.mount(container);
    await this.render(container);
    return this;
  }

  /**
   * Logika Bisnis: Menyimpan Artikel
   */
  async handleSave(payload) {
    try {
      const state = this.cms.getState('article.draft');
      await this.repository.save(state);
      this.cms.emit('article.saved', { success: true });
    } catch (err) {
      this.cms.emit('error.log', { message: 'Gagal simpan', cause: err });
    }
  }

  /**
   * Rendering Flow (Preserved Logic)
   */
  async render(container) {
    const data = this.cms.getState('article.current');
    // Implementasi renderer tetap menggunakan logic existing
    container.innerHTML = `<h1>${data.title}</h1><p>${data.content}</p>`;
  }

  async destroy() {
    await super.destroy();
    return true;
  }
}