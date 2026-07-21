export async function getAbout() {

    const response = await fetch("assets/json/about.json");

    return await response.json();

}