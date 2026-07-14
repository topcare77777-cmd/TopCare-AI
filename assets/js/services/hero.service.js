export async function getHeroData() {

    const response = await fetch("assets/json/hero.json");

    return await response.json();

}