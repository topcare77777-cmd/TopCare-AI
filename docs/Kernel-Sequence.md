# ==========================================================
# TopCare AI CMS Framework
#
# Document      : Kernel-Sequence.md
# Version       : 1.0.0
# Status        : DRAFT
# Owner         : TopCare AI
# Authority     : Architecture Authority
# Last Review   : Sprint 31A
#
# Cross Reference
# - Kernel-Architecture.md
# - Kernel-API.md
# - Kernel-ADR.md (Pending)
# ==========================================================

1. Purpose

Dokumen ini mendefinisikan urutan eksekusi (execution sequence) seluruh Kernel CMS.

Dokumen ini tidak menjelaskan implementasi, melainkan mendefinisikan:

urutan lifecycle
alur komunikasi
dependency ordering
state transition
event propagation
plugin activation
shutdown sequence

Seluruh implementasi wajib mengikuti urutan pada dokumen ini.

2. Design Goals

Sequence Kernel memiliki tujuan berikut.

2.1 Deterministic

Urutan eksekusi harus selalu sama.

Kernel tidak boleh bergantung pada urutan acak.

2.2 Predictable

Setiap state hanya memiliki satu jalur transisi resmi.

Tidak diperbolehkan melompati lifecycle.

2.3 Recoverable

Apabila terjadi kegagalan pada suatu tahap, Kernel harus mengetahui:

proses yang sudah selesai
proses yang gagal
proses yang belum dimulai
2.4 Observable

Seluruh perubahan state harus dapat diamati.

Kernel harus dapat memberikan informasi status kepada modul maupun proses diagnostik.

3. Kernel Startup Sequence

Startup selalu mengikuti urutan tetap berikut.

Application Start
        │
        ▼
Create CMS Facade
        │
        ▼
initialize()
        │
        ▼
Create Internal Kernel
        │
        ▼
Initialize Core Services
        │
        ▼
Boot Event Bus
        │
        ▼
Boot Store
        │
        ▼
Boot Service Container
        │
        ▼
Boot Module Registry
        │
        ▼
Boot Plugin Manager
        │
        ▼
Kernel Ready
        │
        ▼
mount()
        │
        ▼
Application Running

Urutan ini bersifat mandatory.

4. Lifecycle State Transition

Kernel hanya mengenal state berikut.

CREATED
    │
    ▼
INITIALIZED
    │
    ▼
BOOTED
    │
    ▼
MOUNTED
    │
    ▼
RUNNING
    │
    ▼
DESTROYING
    │
    ▼
DESTROYED

Tidak ada state lain yang diperbolehkan.

5. Lifecycle Rules
CREATED

Kernel baru dibuat.

Belum memiliki resource aktif.

INITIALIZED

Kernel telah membangun struktur internal.

Belum melakukan komunikasi.

BOOTED

Seluruh service internal aktif.

Kernel siap menerima operasi.

Belum terhubung ke runtime.

MOUNTED

Kernel telah terhubung dengan runtime.

Rendering diperbolehkan dimulai.

RUNNING

Seluruh modul dapat bekerja.

Plugin aktif.

Store aktif.

Event aktif.

DESTROYING

Kernel sedang melakukan cleanup.

Modul baru tidak boleh diregistrasi.

Event baru tidak boleh dibuat.

DESTROYED

Seluruh resource telah dilepas.

Kernel tidak dapat digunakan kembali.

Harus dibuat instance baru.

6. Invalid Lifecycle Transition

Kernel wajib menolak transisi berikut.

CREATED
    │
    ├── destroy()
    ├── mount()
    └── emit()

INITIALIZED
    │
    ├── mount()
    └── plugin execution

BOOTED
    │
    └── initialize()

DESTROYED
    │
    ├── boot()
    ├── mount()
    └── emit()

Seluruh pelanggaran menghasilkan:

CMSException(INVALID_STATE)
7. Initialization Dependency Order

Dependency internal memiliki prioritas tetap.

CMS Facade
        │
        ▼
Kernel
        │
        ├─────────────┐
        ▼             ▼
Event Bus       Store
        │             │
        └──────┬──────┘
               ▼
      Service Container
               ▼
      Module Registry
               ▼
      Plugin Manager
               ▼
           Runtime

Dependency tidak boleh membentuk circular reference.

8. Initialization Barrier

Kernel hanya boleh berpindah ke tahap berikutnya apabila seluruh tahap sebelumnya selesai.

Contoh:

Event Bus
FAIL

maka:

Store
Service Container
Registry
Plugin

tidak boleh dijalankan.

Kernel langsung masuk ke proses error handling.

9. Fail Fast Rule

Apabila startup gagal:

startup dihentikan
cleanup dijalankan
exception diteruskan

Kernel tidak boleh berada pada kondisi setengah aktif (partially initialized).

10. Sequence Invariants

Selama startup berlangsung, invariant berikut wajib dipenuhi.

hanya satu startup aktif
tidak ada startup paralel
lifecycle tidak boleh diulang
registry belum menerima plugin sebelum boot selesai
event tidak diproses sebelum Event Bus aktif
Store tidak menerima watcher sebelum Store aktif

11. Event Dispatch Sequence

Event Bus merupakan satu-satunya mekanisme komunikasi internal antar komponen Kernel dan modul CMS.

Setiap event mengikuti urutan eksekusi berikut.

Caller
    │
    ▼
Create Envelope
    │
    ▼
Validate Event
    │
    ▼
Resolve Listeners
    │
    ▼
Priority Sorting
    │
    ▼
Execute Listener #1
    │
    ▼
Execute Listener #2
    │
    ▼
...
    │
    ▼
Collect Results
    │
    ▼
Collect Errors
    │
    ▼
Create Aggregated Result
    │
    ▼
Return Promise<EventResult>
11.1 Event Envelope

Seluruh event wajib dibungkus dalam Event Envelope dengan struktur berikut:

source
type
timestamp
data
metadata

Envelope menjadi kontrak baku sehingga seluruh listener menerima format yang sama.

11.2 Listener Execution Rules

Setiap listener dieksekusi berdasarkan prioritas.

Apabila dua listener memiliki prioritas yang sama, urutan eksekusi mengikuti urutan registrasi.

Listener tidak boleh saling bergantung pada hasil listener lain.

11.3 Fault Isolation

Apabila satu listener gagal:

Listener A   ✓
Listener B   ✕
Listener C   ✓

Kernel tetap melanjutkan eksekusi listener berikutnya.

Kesalahan dicatat ke dalam errors collection dan tidak menghentikan dispatch.

11.4 Event Result Aggregation

Hasil akhir emit() wajib berisi:

success
results
errors
listenerCount
duration

Objek ini menjadi satu-satunya hasil resmi dari proses dispatch.

12. Store Update Sequence

Reactive Store merupakan sumber kebenaran (Single Source of Truth) untuk seluruh data CMS.

Setiap perubahan data mengikuti urutan berikut.

Caller
    │
    ▼
Validate Update
    │
    ▼
Mutate Store
    │
    ▼
Create Snapshot
    │
    ▼
Notify Watchers
    │
    ▼
Broadcast Store Event
    │
    ▼
Finish
12.1 Snapshot Rule

Watcher tidak menerima referensi mutable.

Watcher hanya menerima snapshot yang aman untuk dibaca.

12.2 Watcher Isolation

Watcher dieksekusi secara independen.

Kegagalan satu watcher tidak boleh menghentikan watcher lainnya.

12.3 Recursive Update Protection

Watcher tidak boleh menghasilkan siklus pembaruan tanpa akhir.

Kernel wajib mendeteksi dan menghentikan recursive update yang melampaui batas yang ditentukan oleh implementasi.

13. Module Registration Sequence

Registrasi modul mengikuti urutan tetap berikut.

Receive Module
    │
    ▼
Validate Metadata
    │
    ▼
Check Duplicate
    │
    ▼
Register Module
    │
    ▼
Initialize Module
    │
    ▼
Boot Module
    │
    ▼
Ready
13.1 Registration Rules

Modul wajib memiliki metadata minimal:

name
version
description

Modul tanpa metadata dinyatakan tidak valid.

13.2 Duplicate Protection

Nama modul bersifat unik.

Registrasi dengan nama yang sama wajib ditolak.

14. Plugin Activation Sequence

Plugin merupakan ekstensi resmi Kernel.

Aktivasi plugin mengikuti urutan berikut.

Plugin Loaded
      │
      ▼
Validate Descriptor
      │
      ▼
Resolve Dependencies
      │
      ▼
Initialize
      │
      ▼
Boot
      │
      ▼
Register Events
      │
      ▼
Register Services
      │
      ▼
Plugin Active
14.1 Dependency Resolution

Seluruh dependensi plugin harus tersedia sebelum plugin diaktifkan.

Apabila satu dependensi gagal dipenuhi, plugin tidak boleh dijalankan.

14.2 Activation Barrier

Plugin tidak boleh aktif sebelum Kernel berada pada status BOOTED.

15. Service Resolution Sequence

Resolusi service mengikuti urutan berikut.

Resolve Request
      │
      ▼
Validate Name
      │
      ▼
Find Registration
      │
      ▼
Return Instance

Apabila service tidak ditemukan:

CMSException(SERVICE_NOT_FOUND)
15.1 Resolution Rules

Service yang dikembalikan harus sesuai dengan kebijakan lifecycle yang telah didefinisikan (misalnya Singleton atau Transient).

Kernel tidak boleh membuat service secara implisit saat proses resolve.

16. Shutdown Sequence

Shutdown dilakukan secara berurutan untuk memastikan tidak ada resource yang tertinggal.

destroy()
      │
      ▼
Stop New Events
      │
      ▼
Stop New Watchers
      │
      ▼
Destroy Plugins
      │
      ▼
Destroy Modules
      │
      ▼
Clear Registry
      │
      ▼
Clear Store
      │
      ▼
Clear Event Bus
      │
      ▼
Release Services
      │
      ▼
DESTROYED
16.1 Cleanup Rules

Setiap langkah cleanup bersifat independen.

Kernel harus berusaha menyelesaikan seluruh proses cleanup meskipun salah satu langkah mengalami kegagalan.

17. Error Recovery Flow

Error recovery mengikuti pola berikut.

Operation
     │
     ▼
Error Detected
     │
     ▼
Capture Context
     │
     ▼
Create CMSException
     │
     ▼
Attempt Recovery
     │
     ├───────────┐
     ▼           ▼
Recovered     Unrecoverable
     │           │
     ▼           ▼
Continue     Abort Operation

Recovery tidak boleh menyebabkan Kernel memasuki state yang tidak valid.

18. Runtime Invariants

Selama status RUNNING, Kernel wajib mempertahankan invariant berikut.

Hanya ada satu Event Bus aktif.
Hanya ada satu Store aktif.
Tidak ada listener yang terdaftar lebih dari satu kali untuk pasangan event dan callback yang sama.
Registry tidak boleh mengandung entri duplikat.
Plugin aktif harus memiliki seluruh dependensi yang valid.
Snapshot Store bersifat immutable.
Event Envelope tidak boleh dimodifikasi oleh listener.
Service Container tidak boleh menghasilkan instance yang melanggar kebijakan lifecycle.

Pelanggaran terhadap invariant ini dianggap sebagai pelanggaran arsitektur dan harus ditangani sesuai Error Contract pada Kernel-Architecture.md.

19. Sequence Completion Criteria

Dokumen ini dinyatakan lengkap apabila seluruh sequence berikut telah memiliki definisi formal:

Startup Sequence
Lifecycle Transition
Event Dispatch
Store Update
Module Registration
Plugin Activation
Service Resolution
Shutdown Sequence
Error Recovery
Runtime Invariants

Tidak diperbolehkan menambahkan sequence baru tanpa pembaruan Architecture Decision Record (ADR).

