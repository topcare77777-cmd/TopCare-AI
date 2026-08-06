/**
 * TOPCARE AI PLATFORM V2 — COACH DATA TRANSFER OBJECT (DTO)
 * Path: assets/js/coach/coach.dto.js
 * Status: APPROVED & LOCKED (BUILD 128.0)
 * SRP: Strict DTO schema bridge for Personality Runtime Assessment Results.
 */

export class CoachUserContextDTO {
    constructor(data = {}) {
        this.hasAssessed = Boolean(data.hasAssessed || false);
        this.userName = data.userName || data.name || 'Member TopCare';
        this.dominantPersonality = data.dominantPersonality || data.dominant || 'Melankolis';
        this.secondaryPersonality = data.secondaryPersonality || data.secondary || 'Plegmatis';
        this.scores = data.scores || { koleris: 0, melankolis: 0, sanguinis: 0, plegmatis: 0 };
        this.assessmentDate = data.assessmentDate || data.timestamp || new Date().toLocaleDateString('id-ID');
        this.academyProgress = data.academyProgress || 0;
        this.currentLevel = data.currentLevel || 'Level Dasar';
    }
}

export default CoachUserContextDTO;