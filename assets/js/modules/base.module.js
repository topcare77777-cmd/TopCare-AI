/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Base Module Component
 * ----------------------------------------------------------
 * File      : assets/js/modules/base.module.js
 * Version   : 2.0.0
 * Layer     : Modules Interface
 * 
 * References:
 * - docs/Kernel-Architecture.md (Bab 4.3: Dependency Inversion)
 * - docs/Kernel-API.md          (Bab 5: CMS Facade Integration)
 * - docs/Kernel-Sequence.md     (Bab 13: Module Registration Flow)
 *
 * Status:
 * LOCKED CONTRACT IMPLEMENTATION — FULL REPLACE
 * ==========================================================
 */

import CMSException from '../cms/kernel/cms-exception.js';
import CMS from '../cms/kernel/cms.js';

/**
 * BaseModule bertindak sebagai representasi abstrak dan parent interface 
 * untuk seluruh modul di ekosistem TopCare AI CMS.
 * Seluruh akses infrastruktur didelegasikan secara ketat melalui CMS Facade.
 */
export default class BaseModule {
  #cms;
  #name;
  #version;
  #status;

  /**
   * @param {string} name - Identifier unik modul.
   * @param {string} [version='1.0.0'] - Versi semantic modul.
   * @param {Object} [cmsInstance=null] - Instance CMS Facade opsional untuk DI.
   */
  constructor(name, version = '1.0.0', cmsInstance = null) {
    if (!name || typeof name !== 'string') {
      throw CMSException.invalidArgument('Module name wajib berupa string non-kosong.');
    }

    this.#name = name;
    this.#version = version;
    this.#status = 'CREATED';

    // Mendukung Dependency Injection via constructor, atau fallback ke Singleton Facade
    this.#cms = cmsInstance || CMS.instance();

    if (!this.#cms) {
      throw new CMSException(
        'CMS_FACADE_NOT_FOUND',
        `Modul [${this.#name}] gagal dibuat: CMS Facade v2.0.0 belum diinisialisasi.`
      );
    }
  }

  // --- Core Getters ---
  get name() { return this.#name; }
  get version() { return this.#version; }
  get status() { return this.#status; }
  
  /**
   * Aksesor internal terproteksi bagi child modules untuk interaksi Kernel.
   * @protected
   * @returns {CMS}
   */
  get cms() { return this.#cms; }

  // --- Public Lifecycle API (Preserved for Backward Compatibility) ---

  /**
   * Tahap Inisialisasi Modul
   * @returns {Promise<BaseModule>}
   */
  async init() {
    this.#assertLifecycleTransition('CREATED', 'INITIALIZED');
    this.#status = 'INITIALIZED';
    return this;
  }

  /**
   * Tahap Booting Modul (Event binding & service wiring)
   * @returns {Promise<BaseModule>}
   */
  async boot() {
    this.#assertLifecycleTransition('INITIALIZED', 'BOOTED');
    this.#status = 'BOOTED';
    return this;
  }

  /**
   * Tahap Mounting Modul ke Runtime UI Target
   * @param {HTMLElement|Object} container 
   * @returns {Promise<BaseModule>}
   */
  async mount(container) {
    this.#assertLifecycleTransition('BOOTED', 'MOUNTED');
    if (!container) {
      throw new CMSException('INVALID_CONTAINER', `Mount target untuk modul [${this.#name}] tidak valid.`);
    }
    this.#status = 'MOUNTED';
    return this;
  }

  /**
   * Tahap Penghancuran Modul & Resource Cleanup
   * @returns {Promise<boolean>}
   */
  async destroy() {
    this.#status = 'DESTROYED';
    return true;
  }

  // --- Internal Governance Helper ---

  /**
   * Memvalidasi kepatuhan transisi lifecycle state machine modul
   * @param {string} currentAllowedState 
   * @param {string} nextState 
   */
  #assertLifecycleTransition(currentAllowedState, nextState) {
    if (this.#status !== currentAllowedState) {
      throw CMSException.invalidState(
        `Pelanggaran Lifecycle Modul [${this.#name}]: Tidak dapat transisi ke [${nextState}] dari status [${this.#status}].`
      );
    }
  }
}