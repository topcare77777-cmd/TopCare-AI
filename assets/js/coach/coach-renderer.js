/**
 * TOPCARE AI PLATFORM V2 — INTEGRATED DYNAMIC COACH RENDERER & ENGINE
 * Path: assets/js/coach/coach.renderer.js
 * Status: FIXED & ACTIVE (DYNAMIC RESPONSE + INDONESIAN TTS VOICE)
 */

export class CoachRenderer {
    constructor() {
        this.synth = window.speechSynthesis || null;
    }

    // 1. Ambil Tipe Kepribadian User dari localStorage
    getPersonality() {
        return localStorage.getItem('user_personality') || 'Melankolis';
    }

    // 2. Fitur Suara (Text-to-Speech Bahasa Indonesia)
    speak(text) {
        if (!this.synth) return;
        this.synth.cancel(); // Hentikan suara jika sedang berjalan

        const cleanText = text.replace(/<[^>]*>?/gm, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'id-ID';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        this.synth.speak(utterance);
    }

    // 3. Generator Balasan Dinamis Kontekstual
    generateDynamicResponse(userInput) {
        const query = (userInput || '').toLowerCase().trim();
        const pType = this.getPersonality();

        if (!query) {
            return `Silakan ketikkan pertanyaan Anda. Sebagai pendamping berkarakter ${pType}, saya siap membantu.`;
        }

        // Sapaan / Kabar
        if (query.includes('hallo') || query.includes('halo') || query.includes('khabar') || query.includes('kabar') || query.includes('hai')) {
            return `Halo! Kabar saya sangat baik. Sebagai Coach berorientasi ${pType}, saya siap mendampingi Anda belajar AI dan pengembangan diri hari ini. Apa yang ingin Anda tanyakan?`;
        }

        // Minta Bantuan / Bertanya
        if (query.includes('bantu') || query.includes('nanya') || query.includes('tanya')) {
            return `Tentu saja! Saya dengan senang hati membantu Anda. Sebagai tipe ${pType}, pembahasan terstruktur seperti apa yang sedang Anda butuhkan?`;
        }

        // Pembahasan Belajar & Modul AI
        if (query.includes('belajar') || query.includes('modul') || query.includes('kursus') || query.includes('materi') || query.includes('academy')) {
            return `Untuk tipe kepribadian ${pType}, saya merekomendasikan Anda memulai dari modul 'Dasar Artificial Intelligence' di menu Belajar.`;
        }

        // Pembahasan Kepribadian
        if (query.includes('kepribadian') || query.includes('melankolis') || query.includes('koleris') || query.includes('sanguinis') || query.includes('plegmatis')) {
            return `Karakter Anda adalah ${pType}. Tipe ini memberi Anda daya analitis dan ketelitian yang tinggi dalam menguasai teknologi AI secara mendalam.`;
        }

        // Fallback Acak agar jawaban tidak pernah monoton/berulang
        const fallbacks = [
            `Mengenai "${userInput}", sebagai seorang ${pType}, Anda pasti menyukai analisis yang mendalam dan terstruktur. Mari kita bedah topik ini bersama.`,
            `Topik "${userInput}" sangat menarik! Pendekatan ${pType} yang Anda miliki sangat cocok untuk mengeksplorasi hal ini di modul TopCare AI.`,
            `Terima kasih sudah bertanya tentang "${userInput}". Saya siap memandu Anda memahami langkah-langkahnya secara sistematis.`
        ];

        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    // 4. Inisialisasi Handler Event pada DOM Chat UI
    attachEvents() {
        setTimeout(() => {
            const inputEl = document.querySelector('input[placeholder*="Ketik pesan"]') || document.querySelector('.tc-chat-input');
            const btnSend = document.querySelector('.tc-chat-container button') || document.querySelector('.tc-chat-box button') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Kirim');

            if (!btnSend || btnSend.dataset.engineBound) return;
            btnSend.dataset.engineBound = 'true';

            const processSend = () => {
                const text = inputEl ? inputEl.value.trim() : '';
                if (!text) return;

                // A. Render bubble pesan user
                this.renderUserBubble(text);
                inputEl.value = '';

                // B. Buat balasan dinamis + Suarakan TTS
                setTimeout(() => {
                    const reply = this.generateDynamicResponse(text);
                    this.renderCoachBubble(reply);
                    this.speak(reply);
                }, 300);
            };

            btnSend.addEventListener('click', (e) => {
                e.preventDefault();
                processSend();
            });

            if (inputEl) {
                inputEl.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        processSend();
                    }
                });
            }
        }, 200);
    }

    renderUserBubble(text) {
        const chatBox = document.querySelector('.tc-chat-messages') || document.querySelector('.tc-chat-box') || document.querySelector('.tc-chat-container') || document.querySelector('#coach-chat-area');
        if (!chatBox) return;

        const html = `
            <div style="display: flex; justify-content: flex-end; margin-bottom: 1rem; width: 100%;">
                <div style="background: #2563eb; color: #ffffff; padding: 0.85rem 1.25rem; border-radius: 14px 14px 2px 14px; max-width: 75%; font-size: 0.95rem; line-height: 1.5; box-shadow: 0 4px 12px rgba(37,99,235,0.2);">
                    ${text}
                </div>
            </div>
        `;
        chatBox.insertAdjacentHTML('beforeend', html);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    renderCoachBubble(text) {
        const chatBox = document.querySelector('.tc-chat-messages') || document.querySelector('.tc-chat-box') || document.querySelector('.tc-chat-container') || document.querySelector('#coach-chat-area');
        if (!chatBox) return;

        const html = `
            <div style="display: flex; justify-content: flex-start; margin-bottom: 1rem; width: 100%;">
                <div style="background: #1e293b; color: #f8fafc; padding: 0.85rem 1.25rem; border-radius: 14px 14px 14px 2px; max-width: 75%; font-size: 0.95rem; line-height: 1.5; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                    ${text}
                </div>
            </div>
        `;
        chatBox.insertAdjacentHTML('beforeend', html);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Auto-attach event listener saat modul dimuat
const coachRendererInstance = new CoachRenderer();
coachRendererInstance.attachEvents();

export default coachRendererInstance;