# ==========================================================
# TopCare AI CMS Framework
# ==========================================================
#
# Document              : Kernel Architecture
# File                  : docs/Kernel-Architecture.md
# Version               : 1.0.0
# Status                : DRAFT
# Owner                 : TopCare AI
# Architecture Authority: Chief Software Architect
# Sprint                : 31A
# Last Review           : 2026-07-19
#
# Related Documents
#
# - docs/Kernel-API.md        (Pending)
# - docs/Kernel-Sequence.md   (Pending)
# - docs/Kernel-ADR.md        (Pending)
#
# ==========================================================

1. Vision
1.1 Purpose

TopCare AI CMS Framework dibangun sebagai fondasi jangka panjang untuk seluruh ekosistem TopCare AI.

Framework ini bukan sekadar sekumpulan utilitas JavaScript maupun kumpulan modul yang saling bergantung secara langsung. Framework ini merupakan sebuah kernel yang bertugas mengatur siklus hidup aplikasi, komunikasi antar modul, pengelolaan state, registrasi layanan, serta integrasi plugin secara konsisten.

Seluruh keputusan arsitektur diambil dengan mempertimbangkan keberlanjutan proyek dalam jangka panjang, sehingga perubahan implementasi internal tidak mengubah kontrak publik yang digunakan oleh modul aplikasi.

1.2 Long-Term Vision

Kernel harus mampu mendukung pertumbuhan proyek tanpa memerlukan perubahan besar pada API publik.

Target utama framework adalah:

mempertahankan stabilitas kontrak,
menjaga performa,
meminimalkan technical debt,
memungkinkan penambahan fitur tanpa memodifikasi kode yang telah stabil.

Framework harus tetap dapat berkembang dari Release 1 menuju versi-versi berikutnya tanpa kehilangan kompatibilitas terhadap modul yang telah mengikuti kontrak resmi.

1.3 Architectural Goal

Kernel bertanggung jawab menyediakan infrastruktur yang konsisten bagi seluruh modul CMS.

Kernel bukan tempat implementasi logika bisnis.

Kernel hanya menyediakan mekanisme untuk:

komunikasi,
lifecycle,
dependency management,
state management,
plugin management,
error management.

Seluruh logika bisnis tetap berada pada modul yang menggunakannya.

2. Philosophy

Framework ini dibangun berdasarkan satu prinsip utama:

Simple to use. Difficult to misuse. Ready to evolve.

Prinsip tersebut menjadi dasar seluruh keputusan desain.

2.1 Simple to Use

API publik harus mudah dipahami.

Developer cukup mengenal satu pintu masuk menuju seluruh kemampuan framework.

Kompleksitas internal tidak boleh terekspos kepada modul.

2.2 Difficult to Misuse

Framework harus secara aktif mencegah penggunaan yang tidak sesuai kontrak.

Apabila terjadi pelanggaran kontrak, kernel wajib memberikan kesalahan yang jelas dan konsisten.

Perilaku yang tidak terdefinisi (undefined behavior) tidak diperbolehkan.

2.3 Ready to Evolve

Perubahan implementasi internal tidak boleh memengaruhi API publik.

Kernel harus dapat berkembang tanpa memaksa modul lama untuk ditulis ulang.

Kontrak publik menjadi aset yang paling dijaga selama evolusi framework.

3. Core Principles

Seluruh implementasi wajib mematuhi prinsip-prinsip berikut.

3.1 Single Source of Truth

Setiap jenis informasi hanya memiliki satu sumber resmi.

Tidak boleh terdapat dua implementasi yang memiliki tanggung jawab identik.

3.2 Separation of Concerns

Setiap komponen hanya memiliki satu tanggung jawab utama.

Kernel tidak boleh mengandung logika bisnis.

Modul tidak boleh mengandung logika kernel.

Plugin tidak boleh mengubah perilaku internal kernel secara langsung.

3.3 Explicit Contracts

Seluruh komunikasi dilakukan melalui kontrak yang terdokumentasi.

Tidak diperbolehkan mengandalkan perilaku implisit.

3.4 Composition over Inheritance

Kernel lebih mengutamakan komposisi dibanding pewarisan.

Fitur baru dibangun melalui penyusunan komponen kecil yang saling bekerja sama.

3.5 Event Driven

Komunikasi antarmodul dilakukan menggunakan mekanisme event.

Modul tidak boleh memanggil implementasi internal modul lain secara langsung.

3.6 Reactive Data Flow

Perubahan data harus dapat diamati.

Seluruh sinkronisasi state dilakukan melalui mekanisme observasi yang terdokumentasi.

3.7 Encapsulation

Detail implementasi merupakan tanggung jawab internal.

Hanya API publik yang boleh digunakan oleh modul.

3.8 Predictability

Operasi yang sama harus selalu menghasilkan perilaku yang sama apabila diberikan kondisi yang sama.

Framework tidak boleh memiliki perilaku acak maupun efek samping tersembunyi.

3.9 Progressive Enhancement

Kemampuan baru harus dapat ditambahkan tanpa mengganggu implementasi yang telah stabil.

3.10 Backward Compatibility

Selama masih berada dalam major version yang sama, perubahan tidak boleh merusak kontrak publik.

Breaking change hanya diperbolehkan melalui mekanisme Architecture Decision Record (ADR).

Penutup Bagian 1

Bagian ini menetapkan identitas filosofis Kernel TopCare AI.

Seluruh keputusan desain pada bab-bab berikutnya harus konsisten dengan prinsip-prinsip yang telah didefinisikan di atas.

# ==========================================================
# TopCare AI CMS Framework
# Kernel Architecture
# ==========================================================

Document              : Kernel-Architecture.md
Version               : 1.0.0
Status                : DRAFT
Owner                 : TopCare AI
Architecture Authority: Chief Software Architect
Last Review           : 2026-07-19

This document is under Architecture Governance.
Implementation MUST NOT begin until document status becomes LOCKED.

Cross References

- Kernel-API.md (PENDING)
- Kernel-Sequence.md (PENDING)
- Kernel-ADR.md (PENDING)

4. Design Principles

Seluruh implementasi Kernel wajib mematuhi prinsip berikut tanpa pengecualian.

4.1 Single Responsibility

Setiap komponen Kernel hanya memiliki satu alasan untuk berubah.

Contoh:

Event Bus hanya menangani komunikasi.
Store hanya menangani state.
Service Container hanya menangani dependency.
Module Registry hanya menangani registrasi module.

Tidak diperbolehkan satu komponen mengambil tanggung jawab komponen lain.

4.2 Composition over Inheritance

Kernel lebih mengutamakan komposisi dibanding pewarisan.

Komponen saling bekerja melalui kontrak.

Bukan melalui pewarisan class yang panjang.

Framework harus dapat berkembang tanpa menciptakan hierarchy yang kompleks.

4.3 Dependency Inversion

Module tidak mengetahui implementasi dependency.

Module hanya mengenal abstraksi.

Contoh:

Module
    ↓
CMS Facade
    ↓
Kernel Service

Bukan

Module
    ↓
new EventBus()

Hard Rule:

Module dilarang membuat dependency sendiri.

4.4 Zero Global State

Kernel tidak boleh bergantung pada global variable.

Semua state harus berada di Store.

Contoh yang dilarang:

window.currentUser
window.cms
window.state

Semua data harus berada di:

CMS.store(...)
4.5 Explicit Contract

Seluruh komunikasi menggunakan kontrak yang terdokumentasi.

Tidak boleh ada parameter implisit.

Tidak boleh ada return value yang ambigu.

Semua API harus deterministic.

4.6 Immutable Public Contract

Public API dianggap immutable.

Implementasi internal boleh berubah.

Public API tidak boleh berubah tanpa ADR.

4.7 Fail Fast

Kesalahan harus diketahui sedini mungkin.

Kernel tidak boleh membiarkan invalid configuration berjalan.

Contoh:

invalid module
duplicate service
circular dependency
invalid lifecycle

semuanya harus menghasilkan CMSException.

4.8 Predictable Behavior

Input yang sama wajib menghasilkan output yang sama.

Tidak boleh ada side effect tersembunyi.

4.9 Explicit Lifecycle

Tidak boleh ada module yang "hidup sendiri".

Seluruh module wajib mengikuti lifecycle resmi.

4.10 Progressive Evolution

Kernel harus dapat berkembang.

Namun evolusi hanya boleh dilakukan melalui:

Architecture Decision Record (ADR)

Tidak boleh melalui perubahan langsung.

5. Kernel Topology

Kernel dibangun menggunakan Facade Pattern.

Diagram konseptual:

                 Application
                      │
                      ▼
                 CMS Facade
                      │
      ┌───────────────┼────────────────┐
      │               │                │
      ▼               ▼                ▼
 Event Bus         Store         Service Container
      │               │                │
      └──────┬────────┴────────┬───────┘
             ▼                 ▼
      Module Registry     Plugin Manager
             │
             ▼
           Modules

Prinsip utama:

Application tidak pernah mengakses EventBus secara langsung.

Application tidak pernah mengakses Store secara langsung.

Application hanya mengenal CMS.

CMS bertindak sebagai satu-satunya pintu masuk (Single Entry Point).

6. Kernel Components

Kernel terdiri dari komponen berikut.

CMSException

Menjadi standar error framework.

Tidak boleh menggunakan Error secara langsung untuk error framework.

Event Bus

Bertanggung jawab terhadap komunikasi asynchronous.

Tidak menyimpan data.

Tidak mengetahui Store.

Store

Menjadi Single Source of Truth.

Seluruh perubahan state dilakukan melalui Store.

Service Container

Mengelola dependency injection.

Hanya menyimpan service.

Tidak menyimpan utility stateless.

Module Registry

Menyimpan metadata module.

Tidak mengelola lifecycle.

Plugin Manager

Mengelola plugin lifecycle.

Plugin diperlakukan sebagai extension resmi.

Kernel

Mengorkestrasi seluruh komponen di atas.

Kernel tidak memiliki business logic.

CMS Facade

Satu-satunya API publik.

Seluruh module hanya mengenal CMS.

7. Lifecycle Contract

Seluruh module wajib mengikuti lifecycle berikut.

CREATED

↓

INITIALIZED

↓

BOOTED

↓

MOUNTED

↓

READY

↓

DESTROYING

↓

DESTROYED

Tidak boleh melompati state.

Tidak boleh kembali ke state sebelumnya.

CREATED

Object baru dibuat.

Belum memiliki dependency.

Tidak boleh mengakses DOM.

INITIALIZED

Dependency telah di-resolve.

Konfigurasi awal telah divalidasi.

Belum memasang event.

BOOTED

Event listener telah didaftarkan.

Service telah siap digunakan.

Store telah tersedia.

MOUNTED

Module telah terhubung dengan DOM.

Render pertama diperbolehkan.

READY

Module siap menerima interaksi pengguna.

Seluruh API aktif.

DESTROYING

Seluruh cleanup dijalankan.

Listener dilepas.

Watcher dilepas.

Timer dihentikan.

AbortController dibatalkan.

DESTROYED

Object tidak boleh digunakan kembali.

Pemanggilan method selain destroy() menghasilkan CMSException.

8. Lifecycle Rules

Rule 1

initialize() hanya boleh dipanggil satu kali.

Rule 2

boot() tidak boleh dipanggil sebelum initialize().

Rule 3

mount() tidak boleh dipanggil sebelum boot().

Rule 4

destroy() harus bersifat idempotent.

Rule 5

destroy() wajib melepaskan seluruh resource.

Rule 6

Tidak boleh ada memory leak setelah destroy().

# ==========================================================
# TopCare AI Platform
# Kernel Architecture
# ==========================================================

Document               : Kernel-Architecture.md
Section                : Part 3
Version                : 1.0.0-draft
Status                 : DRAFT
Owner                  : TopCare AI
Architecture Authority : Chief Software Architect
Last Review            : 2026-07-19

Cross References
----------------
Kernel-API.md         : PENDING
Kernel-Sequence.md    : PENDING
Kernel-ADR.md         : PENDING

8. Event Bus Specification
8.1 Purpose

Event Bus merupakan mekanisme komunikasi internal Kernel yang memungkinkan setiap komponen saling berinteraksi tanpa saling mengenal implementasinya.

Tidak ada modul yang boleh memanggil modul lain secara langsung apabila komunikasi dapat dilakukan melalui Event Bus.

8.2 Objectives

Event Bus harus memenuhi prinsip berikut:

asynchronous-first
loosely coupled
deterministic
fault isolated
observable
extensible
8.3 Event Envelope

Seluruh event wajib menggunakan struktur payload yang seragam.

Minimal field:

source
type
timestamp
data

Field tambahan dapat ditambahkan selama tidak mengubah struktur inti.

8.4 Publish Rules

Emit harus:

asynchronous
awaitable
tidak pernah memblokir Kernel
tidak boleh menghentikan listener lain ketika satu listener gagal
8.5 Listener Rules

Kernel mendukung:

standard listener
one-time listener
wildcard listener
priority listener

Urutan eksekusi:

Priority tertinggi → terendah.

Priority yang sama:

FIFO.

8.6 Fault Isolation

Apabila satu listener gagal:

listener lain tetap dijalankan
Kernel tidak boleh crash
seluruh exception dikumpulkan

Kernel tidak pernah menghentikan dispatch hanya karena satu listener gagal.

8.7 Result Aggregation

Emit menghasilkan satu objek hasil.

Objek tersebut harus mampu menjelaskan:

jumlah listener
jumlah sukses
jumlah gagal
hasil setiap listener
daftar error

Dengan demikian monitoring maupun plugin dapat melakukan analisis pasca-eksekusi tanpa mengulang dispatch.

8.8 Wildcard Resolution

Kernel mendukung namespace.

Contoh konseptual:

cms.*
store.*
plugin.*
form.*

Listener wildcard hanya menerima event yang berada dalam namespace yang sama.

Wildcard tidak boleh menghasilkan dispatch ganda terhadap listener identik.

8.9 Memory Rules

Destroy wajib:

menghapus seluruh listener
menghapus referensi callback
menghilangkan circular reference

Tidak boleh ada listener yang hidup setelah Kernel dihancurkan.

9. Reactive Store Specification
9.1 Purpose

Store merupakan Single Source of Truth untuk seluruh data CMS.

Search, Filter, Pagination, CRUD, Editor, History, Autosave dan Media tidak menyimpan salinan data utama.

Seluruh engine bekerja pada referensi Store.

9.2 Objectives

Store harus:

reactive
immutable-aware
observable
lightweight
deterministic
9.3 Ownership

Setiap data hanya memiliki satu owner.

Owner adalah Store.

Seluruh engine hanyalah consumer.

9.4 Read Rules

Consumer hanya membaca melalui API Store.

Akses langsung ke struktur internal dilarang.

9.5 Mutation Rules

Perubahan data hanya boleh dilakukan melalui operasi resmi Store.

Mutation di luar Store dianggap pelanggaran arsitektur.

9.6 Reactivity

Store menyediakan mekanisme observasi perubahan.

Ketika data berubah:

observer menerima perubahan
Event Bus menerima notifikasi
engine terkait dapat melakukan sinkronisasi

Store tidak mengetahui siapa konsumennya.

9.7 Watch Contract

Watch menghasilkan handle yang dapat dihentikan.

Setiap observer wajib dapat dilepas.

Tidak boleh ada observer permanen.

9.8 Snapshot

Store dapat menghasilkan snapshot konsisten.

Snapshot digunakan untuk:

History
Autosave
Undo
Redo
Export

Snapshot tidak boleh mengubah data asli.

9.9 Namespace

Store mendukung namespace logis.

Contoh:

users
articles
media
settings
drafts
history

Namespace mencegah konflik data antar modul.

9.10 Memory Policy

Store harus mampu membuang data yang tidak lagi digunakan.

Kernel tidak boleh mempertahankan referensi yang sudah tidak memiliki owner.

10. Service Container Specification
10.1 Purpose

Service Container menyediakan mekanisme Dependency Injection yang terkontrol.

Container hanya digunakan untuk service yang memiliki state atau resource.

10.2 Registration Rules

Service wajib memiliki identifier unik.

Registrasi ganda harus ditolak kecuali secara eksplisit diperbolehkan oleh konfigurasi.

10.3 Resolution Rules

Resolusi dependency dilakukan melalui Container.

Tidak diperbolehkan membuat instance service secara langsung di dalam module.

10.4 Lifetime

Kernel mengenal dua lifetime utama:

Singleton
Transient

Pemilihan lifetime harus berdasarkan karakteristik service.

10.5 Stateless Utilities

Utility stateless tidak masuk ke Container.

Contoh:

validator
formatter
helper

Utility tersebut dapat digunakan langsung tanpa Dependency Injection.

10.6 Circular Dependency

Circular dependency harus terdeteksi sebelum runtime.

Kernel wajib menolak graph dependency yang tidak valid.

10.7 Disposal

Service yang memiliki lifecycle wajib dibersihkan ketika Kernel dihancurkan.

11. Module Registry Specification
11.1 Purpose

Module Registry menjadi katalog resmi seluruh module CMS.

Registry bukan loader.

Registry hanya mengelola metadata.

11.2 Metadata

Minimal metadata:

identifier
version
lifecycle status
dependencies
capabilities
11.3 Registration

Module hanya dapat didaftarkan satu kali.

Identifier harus unik.

11.4 Dependency Validation

Sebelum module dijalankan:

Dependency harus tervalidasi.

Module tidak boleh boot apabila dependency belum tersedia.

11.5 Lifecycle Tracking

Registry menyimpan status:

registered
initialized
booted
mounted
destroyed

Status harus selalu konsisten.

12. Plugin Manager Specification
12.1 Purpose

Plugin Manager bertanggung jawab mengelola ekstensi tanpa mengubah Kernel.

12.2 Isolation

Plugin tidak boleh memiliki akses langsung terhadap internal Kernel.

Seluruh interaksi dilakukan melalui API publik.

12.3 Lifecycle

Plugin mengikuti lifecycle yang sama dengan module.

initialize
boot
mount
destroy
12.4 Capability Declaration

Plugin wajib mendeklarasikan kemampuan yang dimilikinya.

Kernel menggunakan deklarasi ini untuk validasi kompatibilitas.

12.5 Failure Policy

Kegagalan satu plugin tidak boleh menghentikan plugin lain.

Plugin Manager menerapkan fault isolation yang sama dengan Event Bus.

12.6 Version Compatibility

Plugin harus mendeklarasikan kompatibilitas terhadap versi Kernel.

Plugin yang tidak kompatibel tidak boleh diaktifkan.

12.7 Security Boundary

Plugin tidak diperbolehkan:

mengubah state internal Kernel
memodifikasi registry
memodifikasi container
memodifikasi Event Bus

di luar API resmi yang telah disediakan.

13. Error Architecture

Seluruh Kernel wajib menggunakan satu kontrak error yang konsisten.

13.1 Objectives

Error bukan sekadar pesan.

Error adalah informasi arsitektural.

Setiap error harus mampu menjelaskan:

penyebab
lokasi
konteks
severity
recovery recommendation
13.2 Error Categories

Kernel mendefinisikan namespace error.

Contoh kategori:

CMS_*

EVENT_*

STORE_*

MODULE_*

PLUGIN_*

SERVICE_*

SECURITY_*

VALIDATION_*

Setiap kategori mempunyai kode unik.

13.3 Fail Fast

Kernel tidak boleh menyembunyikan kesalahan fatal.

Rule:

invalid configuration → stop
invalid lifecycle → stop
duplicate registration → stop
dependency failure → stop
13.4 Recoverable Errors

Kesalahan operasional yang tidak memengaruhi stabilitas Kernel boleh diteruskan sebagai warning.

Contoh:

plugin gagal
listener gagal
optional module tidak tersedia

Kernel tetap berjalan.

14. Constants & Type System

Seluruh magic string dilarang.

Semua identifier harus berasal dari Constant Registry.

Contoh kategori:

Lifecycle State
Event Namespace
Store Namespace
Plugin Status
Module Status
Error Code
Dependency Type

Tujuan:

mengurangi typo
mempermudah refactoring
meningkatkan autocomplete IDE
15. Performance Rules

Kernel adalah hot path.

Karena itu seluruh implementasi wajib mematuhi aturan berikut.

15.1 O(1) Preferred

Operasi umum harus sedapat mungkin O(1).

Contoh:

service lookup
event lookup
module lookup
15.2 Lazy Initialization

Object tidak dibuat sebelum dibutuhkan.

15.3 Zero Duplicate Work

Kernel tidak boleh melakukan pekerjaan dua kali.

Contoh:

parsing ulang
validasi ulang
rendering ulang

tanpa alasan eksplisit.

15.4 Cache Friendly

Objek yang sering dipakai boleh di-cache selama:

valid
sinkron
memiliki mekanisme invalidasi
15.5 Minimal Allocation

Kurangi alokasi object baru di jalur yang sering dipanggil.

16. Memory Management

Framework harus menjaga kebersihan memori.

16.1 Listener Cleanup

Seluruh listener wajib dilepas saat destroy.

16.2 Watch Cleanup

Seluruh watcher wajib dilepas.

16.3 Module Cleanup

Module wajib membersihkan:

timer
observer
subscription
cache sementara
reference DOM
16.4 No Memory Leak

Tidak boleh ada reference yang menggantung setelah destroy.

16.5 Deterministic Destruction

Destroy harus menghasilkan kondisi identik pada setiap eksekusi.

17. Security Principles

Kernel bukan security framework.

Namun Kernel wajib menyediakan pondasi keamanan.

Prinsip:

least privilege
immutable configuration
trusted boundary
explicit permission
no implicit execution

Kernel tidak boleh melakukan evaluasi kode dinamis.

18. Testing Strategy

Kernel wajib mudah diuji.

Setiap komponen harus mendukung:

unit testing
integration testing
contract testing

Prioritas:

Contract
Behaviour
Performance
Regression
19. Definition of Done (DoD)

Sebuah komponen dinyatakan selesai apabila memenuhi seluruh syarat berikut.

Functional
seluruh contract dipenuhi
lifecycle valid
API stabil
Quality
lint bersih
tanpa warning kritis
tanpa dead code
Architecture
tidak melanggar dokumen ini
tidak membuat dependency baru tanpa ADR
mengikuti Facade Pattern
Performance
tidak ada memory leak
cleanup lengkap
tidak ada listener tersisa
Documentation
API terdokumentasi
perubahan dicatat
cross-reference diperbarui
Testing
unit test lulus
integration test lulus
regression aman
20. Architectural Governance

Seluruh perubahan Kernel mengikuti proses berikut.

Proposal

↓

Review

↓

Architecture Decision

↓

Implementation

↓

Testing

↓

Documentation Update

↓

Approval

↓

Release

Tidak diperbolehkan implementasi yang melewati proses ini.

20.1 Feature Freeze

Architecture Authority berhak menghentikan implementasi apabila:

contract berubah
dependency melanggar aturan
terjadi architectural drift
20.2 Breaking Changes

Breaking change hanya boleh dilakukan melalui ADR resmi.

20.3 Source of Truth

Urutan prioritas:

Kernel Architecture

↓

Kernel API

↓

Kernel Sequence

↓

ADR

↓

Implementation

Implementasi tidak boleh bertentangan dengan dokumentasi.

21. Future Evolution

Kernel dirancang untuk berkembang tanpa mengubah API publik.

Target evolusi:

Worker Support
Time Travel Debugging
DevTools Integration
Distributed Event Channel
Async Plugin Loading
Multi Store
Offline Synchronization
Snapshot Persistence
Performance Profiler
Hot Module Replacement

Semua fitur tersebut harus tetap mematuhi kontrak arsitektur saat ini.

22. Architectural Lock Statement

Dokumen ini mendefinisikan filosofi, kontrak, batasan, dan tata kelola Kernel TopCare AI CMS Framework.

Seluruh implementasi Kernel wajib mengacu pada dokumen ini.

Perubahan terhadap isi dokumen hanya dapat dilakukan melalui proses Architecture Decision Record (ADR) yang sah.

Selama status dokumen berubah menjadi LOCKED, isi dokumen ini menjadi Single Source of Truth untuk seluruh implementasi Kernel.