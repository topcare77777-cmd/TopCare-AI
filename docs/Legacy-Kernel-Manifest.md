# Legacy Kernel Manifest

Status: FROZEN
Location: assets/js/kernel/

Components:
- kernel.js
- container.js
- events.js
- lifecycle.js
- loader.js
- platform.js
- plugin.js
- service.js

Rules:
- No new feature: DILARANG menambahkan fungsi baru.
- No new dependency: DILARANG menambah library eksternal.
- Bug fix only: Hanya untuk memperbaiki blocker migrasi (dengan persetujuan Arsitek).
- Compliance: Wajib memicu [LEGACY KERNEL WARNING] pada setiap akses.