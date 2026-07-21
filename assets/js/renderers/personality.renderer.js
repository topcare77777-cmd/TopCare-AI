/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Personality Renderer Component
 * ----------------------------------------------------------
 * Layer     : Presentation (Pure)
 * Status    : MIGRATED (Refined)
 * ==========================================================
 */

const TEMPLATE = `
  <div class="personality-result">
    <h3 class="type"></h3>
    <div class="score"></div>
  </div>
`;

export default class PersonalityRenderer {
  /**
   * Pure presentation layer: tidak ada state internal, tidak ada akses global.
   */
  render(container, data) {
    // Input Validation
    if (!(container instanceof HTMLElement)) {
      console.warn('PersonalityRenderer: Invalid container element');
      return;
    }
    if (!data || typeof data.type === 'undefined' || typeof data.score === 'undefined') {
      console.error('PersonalityRenderer: Invalid data contract');
      return;
    }
    
    // Idempotent Render: Mengganti konten container (Full Replace)
    container.innerHTML = TEMPLATE;
    container.querySelector('.type').textContent = data.type;
    container.querySelector('.score').textContent = `Score: ${data.score}`;
  }

  clear(container) {
    if (container instanceof HTMLElement) {
      container.innerHTML = '';
    }
  }
}