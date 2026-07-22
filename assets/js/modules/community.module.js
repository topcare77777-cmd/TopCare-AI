import CommunityService from "../services/community.service.js";
import CommunityRenderer from "../renderers/community.renderer.js";
import CommunityComponent from "../components/community.component.js";

class CommunityModule {

    async init(containerId = "community-wrapper") {

        console.log("[CommunityModule] Initialized");

        try {

            const data = await CommunityService.load();

            if (!data) return;

            const html = CommunityRenderer.render(data);

            CommunityComponent.mount(containerId, html);

        } catch (error) {

            console.error("[CommunityModule]", error);

        }

    }

}

export default new CommunityModule();