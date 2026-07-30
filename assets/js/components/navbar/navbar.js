class NavbarComponent {
    mount(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.className = "header";
        container.innerHTML = `
            <nav class="tc-navbar">
                <div class="tc-navbar-brand">
                    <a href="#">TopCare AI</a>
                </div>
                <div class="tc-navbar-links">
                    <a href="#" class="tc-navbar-link">Home</a>
                    <a href="#features-section" class="tc-navbar-link">Features</a>
                    <a href="#" class="tc-navbar-link">Docs</a>
                </div>
            </nav>
        `;
    }
}

export default new NavbarComponent();