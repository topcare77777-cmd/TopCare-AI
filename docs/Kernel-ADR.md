# ==========================================================
# TopCare AI CMS Framework
#
# Document      : Kernel-ADR.md
# Version       : 1.0.0
# Status        : DRAFT
# Owner         : TopCare AI
# Architecture Authority : Chief Software Architect
# Last Review   : Sprint 31A
#
# Cross References
# - Kernel-Architecture.md
# - Kernel-API.md
# - Kernel-Sequence.md
# ==========================================================

1. Purpose

Architecture Decision Record (ADR) merupakan catatan resmi seluruh keputusan arsitektur yang memengaruhi Kernel CMS.

Dokumen ini menjadi sumber kebenaran mengenai mengapa suatu keputusan diambil, bukan bagaimana keputusan tersebut diimplementasikan.

Setiap perubahan fundamental terhadap arsitektur wajib direkam sebagai ADR baru.

2. Objectives

Kernel-ADR memiliki tujuan berikut:

Mendokumentasikan keputusan strategis.
Menjelaskan alasan teknis di balik setiap keputusan.
Menghindari pengulangan diskusi yang telah disepakati.
Menjadi referensi historis bagi seluruh kontributor.
Menjaga konsistensi evolusi arsitektur.
3. ADR Lifecycle

Setiap ADR mengikuti siklus berikut.

PROPOSED
     │
     ▼
UNDER REVIEW
     │
     ▼
APPROVED
     │
     ▼
IMPLEMENTED
     │
     ▼
SUPERSEDED (optional)

Status APPROVED menjadi dasar implementasi.

Status SUPERSEDED tidak menghapus ADR lama, melainkan menggantinya dengan keputusan baru yang memiliki referensi silang.

4. ADR Template

Setiap keputusan baru wajib menggunakan struktur berikut.

ADR ID
Title
Status
Date
Decision
Context
Alternatives
Consequences
Related Documents
Supersedes
Superseded By

Tidak diperbolehkan mengubah format dasar ini.

5. ADR-001
Kernel as Single Source of Truth
Status

APPROVED

Context

Framework memerlukan satu pusat koordinasi agar seluruh modul memiliki perilaku yang konsisten.

Decision

Seluruh modul CMS hanya berinteraksi melalui CMS Facade.

Komponen internal Kernel tidak boleh diakses secara langsung oleh modul.

Alternatives
Direct EventBus access.
Direct Store access.
Direct ServiceContainer access.

Seluruh alternatif tersebut ditolak.

Consequences
API publik menjadi stabil.
Refactoring internal tidak memengaruhi modul.
Kompleksitas Kernel tersembunyi di balik Facade.
6. ADR-002
Event-Driven Communication
Status

APPROVED

Context

Komunikasi langsung antar modul menghasilkan coupling tinggi.

Decision

Seluruh komunikasi antar modul menggunakan Event Bus.

Event menjadi mekanisme koordinasi utama.

Alternatives
Direct method invocation.
Shared mutable objects.

Alternatif tersebut ditolak karena meningkatkan coupling.

Consequences
Modul menjadi independen.
Plugin dapat ditambahkan tanpa mengubah modul lain.
Evolusi sistem lebih aman.
7. ADR-003
Reactive Store
Status

APPROVED

Context

Search, Filter, Pagination, dan modul lain membutuhkan sumber data bersama yang konsisten.

Decision

Kernel menggunakan Reactive Store sebagai Single Source of Truth.

Seluruh perubahan data dilakukan melalui Store.

Alternatives
Shared arrays.
Global variables.
Manual synchronization.

Seluruh alternatif ditolak.

Consequences
Konsistensi data meningkat.
Re-render dapat dipicu secara terkontrol.
Risiko inkonsistensi state berkurang.
8. ADR-004
Dependency Injection Policy
Status

APPROVED

Context

Service yang saling membuat instance secara langsung menyebabkan ketergantungan yang sulit dikendalikan.

Decision

Kernel menggunakan Dependency Injection khusus untuk stateful services.

Stateless utilities tidak dimasukkan ke dalam container.

Consequences
Lifecycle service dapat dikontrol.
Pengujian menjadi lebih mudah.
Circular dependency lebih mudah dideteksi.
9. ADR-005
Lifecycle Standardization
Status

APPROVED

Decision

Seluruh modul wajib mengikuti lifecycle berikut:

initialize
boot
mount
destroy

Tidak diperbolehkan menambahkan lifecycle alternatif tanpa ADR baru.

10. ADR-006
Fail Fast Philosophy
Status

APPROVED

Context

Kernel yang berada pada kondisi partially initialized sulit diprediksi dan berisiko menghasilkan perilaku yang tidak konsisten.

Decision

Kernel menghentikan proses startup segera setelah terjadi kegagalan kritis.

Consequences
Sistem gagal lebih awal namun tetap konsisten.
Tidak ada state setengah aktif.
Debugging menjadi lebih sederhana.
11. ADR Governance Rules

Setiap ADR baru harus memenuhi aturan berikut:

Memiliki konteks yang jelas.
Menjelaskan alternatif yang dipertimbangkan.
Menjelaskan alasan keputusan.
Menjelaskan konsekuensi teknis.
Memiliki referensi silang ke dokumen terkait.
Tidak bertentangan dengan Kernel-Architecture.md.

Apabila terjadi konflik, keputusan harus melalui proses Architecture Review sebelum implementasi dilanjutkan.

12. Decision Authority

Keputusan arsitektur hanya dapat disahkan oleh:

Project Owner
Architecture Authority

Kontributor lain dapat mengusulkan ADR baru, tetapi tidak dapat mengubah status menjadi APPROVED tanpa persetujuan kedua pihak tersebut.

13. Architectural Freeze

Selama Sprint 31B (Kernel Implementation):

Tidak ada perubahan kontrak arsitektur.
Tidak ada perubahan API publik.
Tidak ada perubahan lifecycle.
Tidak ada perubahan Event Contract.
Tidak ada perubahan Store Contract.

Seluruh implementasi wajib mengikuti dokumentasi yang telah disahkan.

14. Future Evolution Policy

Perubahan besar pada Kernel hanya diperbolehkan apabila:

Dibutuhkan oleh kebutuhan bisnis yang tervalidasi.
Tidak dapat diselesaikan melalui ekstensi plugin.
Memiliki ADR baru dengan status APPROVED.
Memiliki analisis dampak terhadap dokumentasi dan implementasi.
15. Documentation Lock Criteria

Seluruh paket dokumentasi Sprint 31A dapat dinyatakan LOCKED apabila memenuhi syarat berikut:

Kernel-Architecture.md → APPROVED
Kernel-API.md → APPROVED
Kernel-Sequence.md → APPROVED
Kernel-ADR.md → APPROVED
Tidak terdapat konflik terminologi.
Seluruh referensi silang tervalidasi.
Tidak ada kontrak yang saling bertentangan.

Setelah kondisi tersebut terpenuhi, Sprint 31A dinyatakan selesai dan Sprint 31B dapat dibuka.

