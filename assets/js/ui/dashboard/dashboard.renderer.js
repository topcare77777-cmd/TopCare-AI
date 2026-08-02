/**
 * TOPCARE AI PLATFORM V2 — ENTERPRISE DASHBOARD RENDERER
 * Path: assets/js/ui/dashboard/dashboard.renderer.js
 * Status: ACTIVE (SPRINT F - LOCKED GOLDEN BASELINE)
 * Role: Pure Read-Only Renderer Consuming Single EnterpriseDashboardDTO Snapshot
 */

import DiagnosticsAggregator from '../../services/dashboard/diagnostics.aggregator.js';
import HealthEvaluator from '../../services/dashboard/health.evaluator.js';
import MetricsStreamBuilder from '../../services/dashboard/metrics.stream.builder.js';
import AuditTrailStore from '../../services/dashboard/audit.trail.store.js';
import { createEnterpriseDashboardDTO } from '../../core/dashboard/enterprise.dashboard.dto.js';
import TimeProvider from '../../core/time/time.provider.js';

export const DashboardFacade = Object.freeze({
    /**
     * Assembles single unified EnterpriseDashboardDTO snapshot.
     */
    assembleDashboardDTO({ metricsSnapshotDTO = null, contextSnapshotDTO = null } = {}) {
        const aggregated = DiagnosticsAggregator.aggregateSnapshots({ metricsSnapshotDTO, contextSnapshotDTO });
        const healthDTO = HealthEvaluator.evaluate(aggregated);
        const streams = MetricsStreamBuilder.buildStreams(metricsSnapshotDTO);
        const audits = AuditTrailStore.getAuditEvents();

        const captureTime = TimeProvider.iso();

        return createEnterpriseDashboardDTO({
            capturedAt: captureTime,
            health: healthDTO,
            metricsStreams: streams,
            auditEvents: audits,
            releaseInfo: {
                platformVersion: '2.1.0',
                releaseStatus: 'GOLDEN_SEALED'
            }
        });
    }
});

export const DashboardRenderer = Object.freeze({
    /**
     * Pure Read-Only DOM Rendering. Consumes SINGLE EnterpriseDashboardDTO only.
     */
    render(containerEl, enterpriseDashboardDTO) {
        if (!containerEl || !enterpriseDashboardDTO) return;

        const { health, metricsStreams, auditEvents, releaseInfo, capturedAt } = enterpriseDashboardDTO;

        let streamsHTML = '';
        for (const s of metricsStreams) {
            streamsHTML += `
                <div style="background:#1E293B; padding:12px; border-radius:6px; margin-bottom:8px; border:1px solid #334155;">
                    <div style="display:flex; justify-size:space-between; color:#F8FAFC; font-weight:bold;">
                        <span>${s.name}</span>
                        <span style="color:#10B981;">${s.current} (${s.trend})</span>
                    </div>
                </div>
            `;
        }

        let auditHTML = '';
        for (const a of auditEvents) {
            auditHTML += `
                <div style="font-size:11px; color:#94A3B8; padding:4px 0; border-bottom:1px dashed #334155;">
                    [${a.timestamp}] <strong>${a.eventType}</strong>: ${a.description}
                </div>
            `;
        }

        containerEl.innerHTML = `
            <div class="topcare-dashboard-container" style="background:#0F172A; color:#F8FAFC; padding:20px; font-family:sans-serif; min-height:100vh;">
                <header style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:12px; margin-bottom:20px;">
                    <div>
                        <h2 style="margin:0; color:#3B82F6;">TopCare AI Enterprise Observability Dashboard</h2>
                        <span style="font-size:11px; color:#64748B;">Platform Version: ${releaseInfo.platformVersion} | Captured At: ${capturedAt}</span>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size:24px; font-weight:bold; color:${health.status === 'HEALTHY' ? '#10B981' : '#EF4444'};">${health.score} / 100</span>
                        <div style="font-size:12px; color:#94A3B8;">Status: ${health.status}</div>
                    </div>
                </header>

                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                    <section>
                        <h3 style="color:#94A3B8; border-bottom:1px solid #334155; padding-bottom:8px;">Metrics Telemetry Streams</h3>
                        ${streamsHTML}
                    </section>
                    <section>
                        <h3 style="color:#94A3B8; border-bottom:1px solid #334155; padding-bottom:8px;">Immutable Audit Trail Log</h3>
                        <div style="background:#1E293B; padding:12px; border-radius:6px; max-height:300px; overflow-y:auto;">${auditHTML}</div>
                    </section>
                </div>
            </div>
        `;
    }
});

export default DashboardRenderer;
