// assets/js/coach/conversation/coach-voice-adaptation-bridge.js
/**
 * @file coach-voice-adaptation-bridge.js
 * @description Bridges conversation intelligence strategies and style configurations into structured voice instruction contracts for downstream voice engines.
 * @module Coach/Conversation/VoiceAdaptationBridge
 */

import { CoachConversationEngine } from './coach-conversation-engine.js';

export const CoachVoiceAdaptationBridge = {
    generateVoiceAdaptation(inputTopic = null, userAction = "continue") {
        // 1. Process interaction through conversation engine to secure strategy and style
        let conversationResult = null;
        try {
            conversationResult = CoachConversationEngine.processInteraction(inputTopic, userAction);
        } catch (e) {
            conversationResult = {
                style: { tone: "friendly", explanationStyle: "example_based" },
                responseStrategy: { guidanceLevel: "medium" }
            };
        }

        const style = conversationResult?.style || {};
        const tone = (style.tone || "friendly").toLowerCase();
        const explanationStyle = (style.explanationStyle || "example_based").toLowerCase();

        // 2. Map conversation tone and style into granular voice profile parameters
        let voiceProfile = {
            tone: tone,
            speakingRate: "medium",
            pauseStyle: "natural",
            emphasis: "general"
        };

        let playbackStrategy = {
            mode: "standard",
            repeatSuggestion: false
        };

        if (tone === "calm" || explanationStyle === "structured") {
            voiceProfile.speakingRate = "slow-medium";
            voiceProfile.pauseStyle = "natural";
            voiceProfile.emphasis = "detail";
            playbackStrategy.mode = "guided";
            playbackStrategy.repeatSuggestion = true;
        } else if (tone === "energetic" || explanationStyle === "story_based") {
            voiceProfile.speakingRate = "medium-fast";
            voiceProfile.pauseStyle = "dynamic";
            voiceProfile.emphasis = "motivation";
            playbackStrategy.mode = "interactive";
            playbackStrategy.repeatSuggestion = false;
        } else if (tone === "direct" || explanationStyle === "action_based") {
            voiceProfile.speakingRate = "medium";
            voiceProfile.pauseStyle = "short";
            voiceProfile.emphasis = "action";
            playbackStrategy.mode = "concise";
            playbackStrategy.repeatSuggestion = false;
        } else if (tone === "warm" || explanationStyle === "simple") {
            voiceProfile.speakingRate = "slow";
            voiceProfile.pauseStyle = "comfortable";
            voiceProfile.emphasis = "encouragement";
            playbackStrategy.mode = "supportive";
            playbackStrategy.repeatSuggestion = true;
        }

        return {
            voiceProfile,
            playbackStrategy,
            generatedAt: new Date().toISOString()
        };
    }
};