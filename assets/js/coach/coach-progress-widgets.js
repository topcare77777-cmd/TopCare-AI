// assets/js/coach/coach-progress-widgets.js
/**
 * @file coach-progress-widgets.js
 * @description Presentational UI component that renders isolated dashboard progress widgets using pure ViewModels from CoachDashboard.
 * @module Coach/ProgressWidgets
 */

import { CoachDashboard } from './coach-dashboard.js';

export const CoachProgressWidgets = {
    async renderWidgets(containerElement) {
        if (!containerElement) return false;

        const viewModel = await CoachDashboard.getDashboardData();

        containerElement.innerHTML = `
            <div class="row g-3 coach-progress-widgets">
                <!-- Progress Card / Ring Widget -->
                <div class="col-md-4">
                    <div class="card h-100 shadow-sm border-0 bg-light">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div>
                                <h6 class="text-muted text-uppercase small fw-bold mb-2">Proses Belajar</h6>
                                <h3 class="fw-bold mb-1">${viewModel.progress.percentage}%</h3>
                                <p class="text-secondary small mb-3">Dari total target program</p>
                            </div>
                            <div class="progress" style="height: 6px;">
                                <div class="progress-bar bg-primary" role="progressbar" style="width: ${viewModel.progress.percentage}%;" aria-valuenow="${viewModel.progress.percentage}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Milestone / Achievement Badge Widget -->
                <div class="col-md-4">
                    <div class="card h-100 shadow-sm border-0 bg-light">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div>
                                <h6 class="text-muted text-uppercase small fw-bold mb-2">Pencapaian</h6>
                                <h3 class="fw-bold mb-1">${viewModel.achievements.unlockedCount} / ${viewModel.achievements.total}</h3>
                                <p class="text-secondary small mb-0">Lencana terbuka</p>
                            </div>
                            <div class="mt-3">
                                <span class="badge bg-success bg-opacity-15 text-success">
                                    ${viewModel.achievements.unlockedCount > 0 ? 'Aktif & Konsisten' : 'Mulai Belajar'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Analytics / Voice Session Widget -->
                <div class="col-md-4">
                    <div class="card h-100 shadow-sm border-0 bg-light">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div>
                                <h6 class="text-muted text-uppercase small fw-bold mb-2">Aktivitas Suara</h6>
                                <h3 class="fw-bold mb-1">${viewModel.analytics.voiceSessions}</h3>
                                <p class="text-secondary small mb-0">Total sesi pemutaran suara</p>
                            </div>
                            <div class="mt-3 text-muted small">
                                <i class="bi bi-clock-history"></i> Terakhir: ${viewModel.analytics.lastActivity ? new Date(viewModel.analytics.lastActivity).toLocaleDateString() : 'Belum ada'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return true;
    }
};