/**
 * TOPCARE AI PLATFORM V2 — LAYERED CONTEXT ENGINE
 * Path: assets/js/services/home/coach.context.js
 * Role: Assembles Multi-Layered Context DTO from Pipeline Execution State
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';
import PersonalityProfileEngine from '../../domain/personality/personality.profile.engine.js';

export const CoachContext = (() => {

    function buildFrom(userMessage, intentContract, memorySnapshot) {
        const identity = memorySnapshot?.identity || {};
        const conversationState = memorySnapshot?.conversation || {};
        const domainState = memorySnapshot?.domainState || {};

        const personalityProfile = PersonalityProfileEngine.resolveProfile(identity.personality || identity.temperament);

        const conversationContext = {
            currentMessage: userMessage || '',
            turnCount: conversationState.turnCount || 0,
            recentTopics: conversationState.lastTopic ? [conversationState.lastTopic] : [],
            historyCount: (conversationState.history || []).length
        };

        const currentIntent = {
            intentId: intentContract?.id || 'unknown',
            confidence: intentContract?.confidence || 0.0,
            entities: intentContract?.entities || []
        };

        const sessionProgress = {
            currentGoal: domainState.currentGoal || 'Bimbingan Pengembangan Diri',
            activeTopic: conversationState.lastTopic || domainState.activeTopic || 'Umum',
            unfinishedTopics: domainState.unfinishedTopics || [],
            coachingProgress: domainState.coachingProgress || 'IN_PROGRESS'
        };

        // Alignment: Replaced NLP Sentiment with Domain Coaching Interaction State
        const interactionSignal = {
            interactionState: intentContract?.confidence > 0.8 ? 'FOCUSED_ENGAGED' : 'NEUTRAL_EXPLORATORY',
            engagementLevel: (conversationState.turnCount || 0) > 3 ? 'HIGH' : 'MODERATE',
            supportNeeded: intentContract?.id === 'frustration' || false
        };

        const riskFlags = {
            hasMedicalKeywords: false,
            requiresSafetyDisclaimer: false
        };

        // Deterministic DTO without dynamic timestamp leakage
        return deepFreezeDTO({
            personalityProfile,
            conversationContext,
            currentIntent,
            sessionProgress,
            interactionSignal,
            riskFlags
        });
    }

    return Object.freeze({
        buildFrom
    });
})();

export default CoachContext;
