/**
 * file: assets/js/core/index.js
 * (Reverted: Removed circular import of Auth subsystem to keep Core strictly pure infrastructure)
 */

import { Logger } from './logger/index.js';
import { Storage } from './storage/index.js';
import { State } from './state/index.js';
import { Config } from './config/index.js';
import { Constants } from './constants/index.js';
import { Utils } from './utils/index.js';
import { Performance } from './performance/index.js';
import { DOM } from './dom/index.js';
import { Theme } from './theme/index.js';
import { Event } from './event/index.js';
import { Registry } from './registry/index.js';
import { Runtime } from './runtime/index.js';
import { Lifecycle } from './lifecycle/index.js';

export const Core = Object.freeze({
    name: Constants.get('app', 'NAME'),
    version: Constants.get('app', 'VERSION'),
    build: '120.2',

    Logger,
    Storage,
    State,
    Config,
    Constants,
    Utils,
    Performance,
    DOM,
    Theme,
    Event,
    Registry,
    Runtime,
    Lifecycle
});