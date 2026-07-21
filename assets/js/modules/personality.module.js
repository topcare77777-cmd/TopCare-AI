/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Personality Module - Root Orchestrator
 * ==========================================================
 */

import BaseModule from './base.module.js';
import PersonalityService from '../services/personality.service.js';
import PersonalityRenderer from '../renderers/personality.renderer.js';
import PersonalityWidget from '../components/personality-widget.js';

export default class PersonalityModule extends BaseModule {
  constructor(cmsInstance) {
    super('personality', '2.0.0', cmsInstance);
    this.service = null;
    this.renderer = null;
    this.widget = null;
  }

  async init() {
    await super.init();
    this.service = new PersonalityService(this.cms);
    // Register service to CMS Kernel Container
    this.cms.service("personality", this.service);
    this.renderer = new PersonalityRenderer();
    return this;
  }

  async mount(container) {
    await super.mount(container);

    if (!(container instanceof HTMLElement)) {
      throw new TypeError('PersonalityModule: Invalid mount container');
    }

    this.widget = new PersonalityWidget({
      container,
      cms: this.cms,
      renderer: this.renderer
    });
    
    this.widget.init();
    return this;
  }

  async processAssessment(rawData) {
    if (!this.service) throw new Error('PersonalityModule: Service not initialized');
    return this.service.calculateScore(rawData);
  }

  async destroy() {
    if (this.widget) {
      this.widget.destroy();
      this.widget = null;
    }
    this.renderer = null;
    this.service = null;
    
    await super.destroy();
    return true;
  }
}