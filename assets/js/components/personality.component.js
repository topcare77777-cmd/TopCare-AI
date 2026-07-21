import BaseComponent from "./base.component.js";

class PersonalityComponent extends BaseComponent {
  constructor() {
    super("#personality");
  }

  async mount() {
    // Resolve service via CMS Facade
    const personalityService = this.cms.resolve("personality");
    
    // Use verified service method
    const data = await personalityService.loadConfig();

    if (!data) {
      return;
    }

    let html = "";

    data.forEach((item) => {
      html += `
        <div class="personality-card">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
      `;
    });

    this.render(html);
  }
}

export default new PersonalityComponent();