// assets/js/coach/ui/coach-animation-layer.js
/**
 * @file coach-animation-layer.js
 * @description Manages lightweight native CSS/JS micro-animations, thinking indicators, and personality-based motion states for the AI Coach widget.
 * @module Coach/UI/AnimationLayer
 */

export const CoachAnimationLayer = {
    injectAnimationStyles() {
        if (typeof document === "undefined") return;
        const styleId = "topcare-coach-animations";
        if (document.getElementById(styleId)) return;

        const styleEl = document.createElement("style");
        styleEl.id = styleId;
        styleEl.textContent = `
            @keyframes topcareFadeIn {
                from { opacity: 0; transform: translateY(6px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes topcareDotPulse {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1.0); }
            }
            .ai-coach-card {
                animation: topcareFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .ai-thinking-dots {
                display: inline-flex;
                gap: 4px;
                align-items: center;
                margin-left: 6px;
                vertical-align: middle;
            }
            .ai-thinking-dots span {
                width: 6px;
                height: 6px;
                background-color: #60a5fa;
                border-radius: 50%;
                display: inline-block;
                animation: topcareDotPulse 1.4s infinite ease-in-out both;
            }
            .ai-thinking-dots span:nth-child(1) { animation-delay: -0.32s; }
            .ai-thinking-dots span:nth-child(2) { animation-delay: -0.16s; }
        `;
        document.head.appendChild(styleEl);
    },

    applyThinkingState(widgetContainerElement, customMessage = "AI Coach sedang berpikir") {
        this.injectAnimationStyles();

        if (!widgetContainerElement) {
            return {
                animationState: "thinking",
                transitionEffect: "fade",
                durationMs: 600,
                generatedAt: new Date().toISOString()
            };
        }

        const messageParagraph = widgetContainerElement.querySelector('p');
        if (messageParagraph) {
            messageParagraph.innerHTML = `
                ${customMessage}
                <span class="ai-thinking-dots">
                    <span></span><span></span><span></span>
                </span>
            `;
            messageParagraph.style.color = "#60a5fa";
        }

        return {
            animationState: "thinking",
            transitionEffect: "fade",
            durationMs: 600,
            generatedAt: new Date().toISOString()
        };
    }
};