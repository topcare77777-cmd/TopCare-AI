/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Dashboard Module Component
 * ----------------------------------------------------------
 * Layer     : Modules Logic
 * Status    : CLEANED & MIGRATED
 * ==========================================================
 */

import BaseModule from './base.module.js';
import DashboardRegistry from '../../dashboard/registry.js'; 

/**
 * DashboardModule mengelola dashboard widget dan statistik.
 * Infrastruktur dimigrasikan ke CMS Facade v2.0.0.
 */
export default class DashboardModule extends BaseModule {
  
  constructor(cmsInstance) {
    super('dashboard', '2.0.0', cmsInstance);
    this.registry = DashboardRegistry;
  }

  async init() {
    await super.init();
    // Migrasi Service: container.get('analytics.engine') -> cms.service('analytics.engine')
    this.analytics = this.cms.service('analytics.engine');
    return this;
  }

  async boot() {
    await super.boot();
    
    // Migrasi Events: legacyEvents -> cms.on
    this.cms.on('dashboard.refresh', () => this.refresh());
    return this;
  }

  async mount(container) {
    await super.mount(container);
    await this.loadWidgets();
    return this;
  }

  /**
   * Data Preservation: Mempertahankan struktur data history member
   */
  async loadWidgets() {
    // Migrasi State: window.session -> cms.getState('member.profile')
    const profile = this.cms.getState('member.profile');
    const stats = await this.analytics.getStats(profile.id);
    
    this.registry.render(stats);
  }

  async refresh() {
    this.cms.emit('dashboard.refreshed', { status: 'success' });
  }

  async destroy() {
    await super.destroy();
    return true;
  }
}