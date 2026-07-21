/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Article Renderer
 * ----------------------------------------------------------
 * Layer     : UI Rendering
 * Mode      : FULL REPLACEMENT
 * Status    : CLEANED
 * ==========================================================
 */

export default class ArticleRenderer {
  /**
   * @param {Object} cms - CMS Facade Injector
   */
  constructor(cms) {
    this.cms = cms;
  }

  /**
   * Render konten artikel ke container target
   * @param {HTMLElement} container 
   * @param {Object} data 
   */
  render(container, data) {
    if (!container) return;
    
    // Mengakses theme via state, bukan window.cms
    const theme = this.cms.getState('theme.active') || 'default';
    
    container.innerHTML = `
      <article class="cms-article theme-${theme}">
        <h1>${data.title}</h1>
        <div class="content">${data.content}</div>
      </article>
    `;
  }
}