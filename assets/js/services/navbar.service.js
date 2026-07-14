export async function getNavbarData() {

    try {

        const response = await fetch("assets/json/navbar.json");

        if (!response.ok) {
            throw new Error("navbar.json tidak ditemukan.");
        }

        return await response.json();

    } catch (error) {

        console.error("Navbar Service :", error);

        return null;

    }

}