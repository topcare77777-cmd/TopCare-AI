class ApiService {
    async fetchContent() {
        try {
            const response = await fetch("assets/js/data/content.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch application data:", error);
            // Fallback safe payload
            return {
                features: [
                    { title: "Native Architecture", description: "Built with pure ES modules, HTML5, and CSS3 without heavy framework bloat." },
                    { title: "Scalable Core", description: "Engineered cleanly for long-term maintainability over the next 3-5 years." },
                    { title: "Cross-Device Ready", description: "Fully optimized for desktop, tablet, and mobile viewing experiences." }
                ]
            };
        }
    }
}

export default new ApiService();