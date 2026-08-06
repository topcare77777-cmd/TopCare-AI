---

### 📄 3. File: `docs/DESIGN_TOKEN_INVENTORY.md`

```markdown
# TOPCARE AI PLATFORM V2 — DESIGN TOKEN INVENTORY
**Build Target:** BUILD 128.3  
**Status:** APPROVED & LOCKED  
**SSOT Reference:** `assets/css/core/design.tokens.css` & `assets/css/core/design.tokens-ext.css`  

---

## 1. Core Color Tokens

| Token Name | Hex / Value | Usage Scope | Status |
| :--- | :--- | :--- | :--- |
| `--tc-color-bg-main` | `#0b0f19` | Global Body Background | Active (Core) |
| `--tc-color-bg-card` | `rgba(17, 24, 39, 0.75)` | Default Glass Cards | Active (Core) |
| `--tc-color-bg-glass` | `rgba(17, 24, 39, 0.85)` | Navigation & Backdrop Shells | Active (Core) |
| `--tc-color-border-glass` | `rgba(255, 255, 255, 0.08)` | Card & Section Borders | Active (Core) |
| `--tc-color-border-hover` | `rgba(139, 92, 246, 0.4)` | Interactive Card Hover Border | Active (Core) |
| `--tc-color-primary` | `#8b5cf6` | Primary Accents, Active Nav, Buttons | Active (Core) |
| `--tc-color-primary-hover` | `#7c3aed` | Button Hover State | Active (Core) |
| `--tc-color-primary-light` | `rgba(139, 92, 246, 0.15)` | Active Nav Background | Active (Core) |
| `--tc-color-secondary` | `#3b82f6` | CTA Primary Buttons | Active (Core) |
| `--tc-color-text-main` | `#f8fafc` | Headings & Primary Body Text | Active (Core) |
| `--tc-color-text-muted` | `#94a3b8` | Subtitles & Muted Descriptions | Active (Core) |

---

## 2. Extension Tokens (`--tc-ext-*` Added in BUILD 128.2A)

| Token Name | Value | Purpose / Usage Scope | Target Consolidation |
| :--- | :--- | :--- | :--- |
| `--tc-ext-touch-target-min` | `44px` | Standard Minimum Touch Target Size for Accessibility | BUILD 130 (Core Merge) |
| `--tc-ext-focus-ring` | `0 0 0 3px rgba(139, 92, 246, 0.5)` | Accessible Focus Ring for Keyboard Nav | BUILD 130 (Core Merge) |
| `--tc-ext-radius-card` | `16px` | Standard Card Border Radius | BUILD 130 (Core Merge) |
| `--tc-ext-glass-backdrop` | `blur(16px)` | Standard Glassmorphism Blur | BUILD 130 (Core Merge) |
| `--tc-ext-mobile-spacing` | `2.5rem` | Standard Mobile Section Vertical Padding | BUILD 130 (Core Merge) |

---

## 3. Radius & Elevation Tokens

| Token Name | Value | Usage Scope | Status |
| :--- | :--- | :--- | :--- |
| `--tc-radius-sm` | `8px` | Badges, Inputs, Small Buttons | Active (Core) |
| `--tc-radius-md` | `12px` | Secondary Banners, Sub-cards | Active (Core) |
| `--tc-radius-lg` | `16px` | Main Feature & Domain Cards | Active (Core) |
| `--tc-radius-xl` | `20px` | Hero Banners, Modals, Shells | Active (Core) |
| `--tc-radius-full` | `9999px` | Pill Buttons, Avatars, Badges | Active (Core) |