/**
 * file: assets/js/plugins/plugin.update.channels.js
 */

import { Core } from '../core/index.js';
import { UPDATE_CHANNELS } from './plugin.marketplace.types.js';

export class UpdateChannelSelector {
    constructor(defaultChannel = UPDATE_CHANNELS.STABLE) {
        this._activeChannel = defaultChannel;
        this._channelPreferences = new Map(); // pluginId -> UPDATE_CHANNEL
        Object.seal(this);
    }

    setGlobalChannel(channel) {
        if (Object.values(UPDATE_CHANNELS).includes(channel)) {
            this._activeChannel = channel;
            Core.Logger.info(`[Update Channel] Global channel switched to: ${channel}`);
        }
    }

    setPluginChannel(pluginId, channel) {
        if (Object.values(UPDATE_CHANNELS).includes(channel)) {
            this._channelPreferences.set(pluginId, channel);
            Core.Logger.info(`[Update Channel] Channel for '${pluginId}' set to: ${channel}`);
        }
    }

    getEffectiveChannel(pluginId) {
        return this._channelPreferences.get(pluginId) || this._activeChannel;
    }

    /**
     * Memilih kandidat Rilis terbaik berdasarkan channel yang berlaku dan bobot kualifikasi.
     * @param {string} pluginId 
     * @param {Array<Object>} availableReleases 
     * @returns {Object|null} Best Release Candidate
     */
    selectBestCandidate(pluginId, availableReleases = []) {
        const channel = this.getEffectiveChannel(pluginId);

        // Filter rilis berdasarkan kualifikasi channel
        const eligible = availableReleases.filter(rel => {
            const relChannel = rel.channel || UPDATE_CHANNELS.STABLE;
            if (channel === UPDATE_CHANNELS.CANARY) return true; // Canary menerima semua (Nightly, Beta, Stable)
            if (channel === UPDATE_CHANNELS.BETA) return relChannel !== UPDATE_CHANNELS.NIGHTLY;
            if (channel === UPDATE_CHANNELS.LTS) return relChannel === UPDATE_CHANNELS.LTS;
            return relChannel === UPDATE_CHANNELS.STABLE || relChannel === UPDATE_CHANNELS.LTS;
        });

        if (eligible.length === 0) return null;

        // Mengurutkan berdasarkan tanggal/versi rilis terbaru
        eligible.sort((a, b) => new Date(b.releasedAt || 0) - new Date(a.releasedAt || 0));
        return eligible[0];
    }
}

export const GlobalUpdateChannelSelector = Object.freeze(new UpdateChannelSelector());