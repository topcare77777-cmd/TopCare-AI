/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Assistant Module Component
 * ----------------------------------------------------------
 * Layer     : Modules Logic
 * Status    : CLEANED & MIGRATED
 * ==========================================================
 */

import BaseModule from './base.module.js';

/**
 * AssistantModule menangani alur interaksi AI.
 * Melakukan migrasi dependensi dari Legacy Kernel ke CMS Facade v2.0.0.
 */
export default class AssistantModule extends BaseModule {
  
  constructor(cmsInstance) {
    super('assistant', '2.0.0', cmsInstance);
    this.aiService = null;
  }

  async init() {
    await super.init();
    // Migrasi Service Access: container.get('ai.service') -> cms.service('ai.service')
    this.aiService = this.cms.service('ai.service');
    return this;
  }

  async boot() {
    await super.boot();
    
    // Migrasi Event: legacyEvents.on -> cms.on
    // Mempertahankan Event Contract 'chat.message'
    this.cms.on('chat.message', (data) => this.handleMessage(data));
    return this;
  }

  async mount(container) {
    await super.mount(container);
    return this;
  }

  /**
   * AI Logic Preservation: Mempertahankan Conversation State & Structure
   */
  async handleMessage(payload) {
    const history = this.cms.getState('assistant.history') || [];
    
    // Proses AI (Flow tetap sama, Source Facade berubah)
    const response = await this.aiService.process(payload.message);
    
    const updatedHistory = [...history, payload, response];
    this.cms.setState('assistant.history', updatedHistory);
    
    // Maintain Event Contract
    this.cms.emit('chat.response', response);
  }

  async destroy() {
    await super.destroy();
    return true;
  }
}