/**
 * TOPCARE AI PLATFORM V2 — BASIC MODULES AGGREGATOR
 * Path: assets/js/learning/ai/basic/basic.modules.js
 * Status: APPROVED & LOCKED (BUILD 128 - FIXED DTO IMPORT PATH)
 * SRP: Aggregates individual lesson modules into a clean Array SSOT.
 */

import LESSON_INTRODUCTION from './lessons/introduction.module.js';
import LESSON_MACHINE_LEARNING from './lessons/machine-learning.module.js';
import LESSON_ETHICS from './lessons/ethics.module.js';
import { deepFreezeDTO } from '../../../core/utils/dto.js';

export const BASIC_MODULES_LIST = deepFreezeDTO([
    LESSON_INTRODUCTION,
    LESSON_MACHINE_LEARNING,
    LESSON_ETHICS
]);

export default BASIC_MODULES_LIST;