export async function getHeroData() {

    try {

        const response = await fetch("assets/json/hero.json");

        if (!response.ok) {

            throw new Error("Hero JSON tidak ditemukan.");

        }

        return await response.json();

    } catch (error) {

        console.error("Hero Service Error :", error);

        return null;

    }

}