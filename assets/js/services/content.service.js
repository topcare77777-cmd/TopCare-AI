class ContentService {
async fetchContent() {
try {
const response = await fetch("assets/js/data/content.json");
if (!response.ok) throw new Error("Failed to fetch content.");
return await response.json();
} catch (error) {
console.error("Content fetch error:", error);
return {
learning: [
{ title: "AI Learning", description: "Pahami dasar kecerdasan buatan dan implementasinya." },
{ title: "Personality Learning", description: "Kembangkan potensi diri melalui pemahaman temperamen." },
{ title: "Digital Skill", description: "Kuasai keterampilan digital esensial masa kini." }
],
personality: [
{ title: "Koleris", description: "Pemimpin yang tegas, mandiri, dan berorientasi pada hasil." },
{ title: "Sanguinis", description: "Pribadi yang ramah, energik, dan antusias." },
{ title: "Melankolis", description: "Analitis, perfeksionis, dan mendalam." },
{ title: "Plegmatis", description: "Tenang, cinta damai, dan setia." }
]
};
}
}
}

export default new ContentService();