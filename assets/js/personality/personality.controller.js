// Di dalam Personality Controller saat assessment selesai:
onAssessmentComplete(resultDTO) {
    // Dispatch Event secara terisolasi (Personality Engine tidak tahu tentang Coach Domain)
    const event = new CustomEvent('tc:assessment:completed', {
        detail: {
            userName: resultDTO.userName || resultDTO.name || 'Member TopCare',
            dominantPersonality: resultDTO.dominant || resultDTO.dominantPersonality || 'Melankolis',
            secondaryPersonality: resultDTO.secondary || resultDTO.secondaryPersonality || 'Plegmatis',
            scores: resultDTO.scores || {}
        }
    });

    window.dispatchEvent(event);
}