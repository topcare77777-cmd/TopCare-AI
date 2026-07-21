class NavbarService {
    async fetchNavbarLinks() {
        try {
            const response = await fetch("assets/js/data/navbar.json");
            if (!response.ok) throw new Error("Failed to load navbar data.");
            return await response.json();
        } catch (error) {
            console.error("Navbar service error:", error);
            return null;
        }
    }
}

export default new NavbarService();