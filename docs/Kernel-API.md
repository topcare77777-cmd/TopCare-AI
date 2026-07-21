# ==========================================================
# TopCare AI CMS Framework
# Kernel API Specification
# ==========================================================

Document            : Kernel-API.md
Version             : 1.0.0-draft
Status              : DRAFT
Owner               : TopCare AI
Architecture        : TopCare AI CMS Kernel
Architecture Authority : Chief Software Architect
Depends On          : Kernel-Architecture.md
Related             : Kernel-Sequence.md
Related             : Kernel-ADR.md
Last Review         : Sprint 31A

CONFIDENTIAL

1. Purpose

Dokumen ini mendefinisikan kontrak API publik yang dapat digunakan oleh seluruh modul CMS.

Dokumen ini tidak menjelaskan implementasi internal.

Seluruh implementasi harus mengikuti kontrak ini.

Apabila implementasi berubah namun kontrak tetap sama, maka implementasi dianggap kompatibel.

2. Scope

Dokumen ini mendefinisikan API untuk:

CMS Facade
Kernel Lifecycle
Event Bus
Reactive Store
Service Container
Module Registry
Plugin Manager

Dokumen ini tidak menjelaskan:

algoritma
struktur data internal
optimisasi
detail JavaScript
3. API Design Goals

Semua API wajib memenuhi prinsip berikut.

3.1 Stable

Public API tidak boleh berubah tanpa ADR.

3.2 Predictable

Method dengan nama yang sama selalu menghasilkan perilaku yang sama.

3.3 Discoverable

Nama method harus mudah ditebak.

Contoh:

CMS.boot()

CMS.mount()

CMS.destroy()

CMS.store()

CMS.emit()

CMS.on()

CMS.off()

bukan

CMS.run()

CMS.execute()

CMS.process()
3.4 Minimal

Kernel hanya membuka API yang benar-benar diperlukan.

Semua detail internal harus tetap private.

3.5 Composable

Seluruh API harus dapat digabungkan.

Contoh:

CMS
    .service(...)
    .module(...)
    .plugin(...)
    .boot()
4. Public Surface

Satu-satunya pintu masuk menuju Kernel adalah:

CMS

Tidak ada modul yang boleh mengakses:

EventBus

Store

Registry

Container

PluginManager

secara langsung.

Seluruh akses dilakukan melalui CMS Facade.

5. CMS Facade

CMS merupakan representasi resmi Kernel.

Seluruh modul hanya mengenal objek ini.

Contoh:

Form
    ↓
CMS
    ↓
Kernel

Bukan:

Form
 ↓
Store
 ↓
EventBus
6. Kernel Lifecycle API

Lifecycle publik terdiri dari empat tahap.

initialize()

boot()

mount()

destroy()

Kontrak lifecycle dijelaskan penuh pada:

Kernel-Architecture.md

Dokumen ini hanya mendefinisikan API yang tersedia.

7. Public Method Categories

Kernel menyediakan kelompok API berikut.

Lifecycle
initialize()

boot()

mount()

destroy()

status()
Events
on()

once()

off()

emit()

listeners()

clear()
Store
store()

watch()

unwatch()

snapshot()
Services
service()

resolve()

hasService()

removeService()
Modules
registerModule()

removeModule()

module()

modules()
Plugins
registerPlugin()

plugin()

plugins()

unloadPlugin()
Diagnostics
health()

version()

state()

statistics()
8. API Stability Levels

Seluruh API memiliki status.

Stable

Dijamin tidak berubah.

Contoh:

boot()

emit()

store()

watch()
Experimental

Masih dapat berubah.

Harus diberi penanda EXPERIMENTAL.

Internal

Tidak boleh dipanggil dari luar.

Tidak termasuk Public API.

9. Compatibility Rules

Kernel harus menjaga:

Backward Compatibility

selama major version tidak berubah.

Breaking Change hanya boleh dilakukan melalui:

ADR
+
Major Version

10. Naming Convention

Seluruh API mengikuti aturan:

verbNoun()

Contoh:

registerModule()

removeModule()

resolveService()

createSnapshot()

Tidak diperbolehkan:

doModule()

go()

process()

action()

11. Lifecycle API Contract

Lifecycle merupakan API utama yang mengendalikan status Kernel.

Semua method lifecycle wajib bersifat idempotent.

11.1 initialize()
Purpose

Mempersiapkan Kernel sebelum digunakan.

Parameters

Tidak menerima parameter.

Returns
CMS

Mengembalikan instance Facade agar mendukung method chaining.

Throws
CMSException(INVALID_STATE)
CMSException(INITIALIZATION_FAILED)
Contract
hanya boleh berhasil satu kali
pemanggilan ulang tidak boleh menghasilkan inisialisasi ganda
tidak melakukan render
tidak menjalankan plugin
11.2 boot()
Purpose

Mengaktifkan seluruh komponen internal Kernel.

Parameters

Tidak ada.

Returns
Promise<CMS>
Throws
CMSException(BOOT_FAILED)
CMSException(INVALID_STATE)
Contract

Boot wajib:

menginisialisasi service
mengaktifkan Event Bus
mengaktifkan Store
mengaktifkan Registry
mengaktifkan Plugin Manager

Boot tidak boleh:

melakukan rendering UI
memodifikasi data aplikasi
11.3 mount(container)
Purpose

Menghubungkan Kernel dengan lingkungan eksekusi.

Parameters
Name	Type	Required
container	Runtime Target	Yes
Returns
Promise<CMS>
Throws
CMSException(MOUNT_FAILED)
CMSException(INVALID_CONTAINER)
Contract

Mount:

hanya dilakukan setelah boot()
boleh dipanggil kembali apabila target berubah
tidak boleh memanggil initialize()
11.4 destroy()
Purpose

Menghentikan seluruh aktivitas Kernel.

Parameters

Tidak ada.

Returns
Promise<Boolean>
Throws

Tidak melempar exception apabila proses cleanup parsial gagal.

Semua kegagalan dicatat melalui Error Contract.

Contract

Destroy wajib:

melepas listener
menghentikan watcher
menghapus plugin aktif
membersihkan registry sementara
membebaskan memori internal
11.5 status()
Purpose

Mengambil status Kernel.

Returns
KernelStatus

Nilai yang diperbolehkan mengacu pada:

Kernel-Architecture.md

12. Event API Contract

Seluruh komunikasi antarmodul dilakukan melalui Event Bus.

12.1 on(event, listener, options)
Parameters
Name	Description
event	Event Name
listener	Callback
options	Listener Options
Returns
Unsubscribe Function
Throws
EVENT_INVALID
LISTENER_INVALID
Contract
listener dipanggil sesuai prioritas
listener dapat dilepas melalui fungsi hasil return
12.2 once()

Kontrak sama dengan on()

Perbedaannya:

listener otomatis dilepas setelah satu eksekusi sukses.

12.3 off()
Parameters

Event Name

Listener

Returns
Boolean
Contract

False apabila listener tidak ditemukan.

12.4 emit()
Parameters

Envelope Event

Returns
Promise<EventResult>

EventResult wajib memiliki struktur:

success

results

errors

duration

listenerCount
Throws

Emit tidak boleh gagal hanya karena satu listener gagal.

Contract
asynchronous
fault isolation
result aggregation
execution metrics
12.5 listeners()
Returns

Readonly Collection

Tidak boleh mengembalikan referensi internal.

12.6 clear()

Menghapus listener.

Return:

CMS
13. Store API Contract

Store merupakan Single Source of Truth untuk modul CMS.

13.1 store(name)
Purpose

Mengambil atau membuat Store.

Parameters

Store Identifier

Returns
Reactive Store
Throws

STORE_INVALID

13.2 watch()
Purpose

Mendaftarkan observer.

Returns
Unwatch Function
Contract

Observer tidak boleh mengubah data Store secara langsung.

13.3 unwatch()
Returns

Boolean

13.4 snapshot()
Returns

Immutable Snapshot

Snapshot wajib aman terhadap perubahan berikutnya.

14. Service Container API Contract

Container hanya menyimpan service yang bersifat stateful.

14.1 service(name, instance)
Returns

CMS

Throws

SERVICE_ALREADY_EXISTS

SERVICE_INVALID

14.2 resolve(name)
Returns

Service Instance

Throws

SERVICE_NOT_FOUND

14.3 hasService()
Returns

Boolean

14.4 removeService()
Returns

Boolean

15. Module Registry Contract
registerModule()

Return

CMS

Throws

MODULE_ALREADY_EXISTS

module()

Return

Registered Module

modules()

Return

Readonly Collection

removeModule()

Return

Boolean

16. Plugin Manager Contract
registerPlugin()

Return

Promise<CMS>

unloadPlugin()

Return

Promise<Boolean>

plugin()

Return

Plugin Descriptor

plugins()

Return

Readonly Collection

17. Diagnostics Contract

Semua method diagnostics bersifat read-only.

health()

Return

Health Report
state()

Return

Kernel State
statistics()

Return

Runtime Metrics
version()

Return

Semantic Version
18. General Return Rules

Semua API publik wajib mengikuti aturan berikut.

Tidak mengembalikan referensi mutable internal.
Menggunakan Promise hanya untuk operasi asynchronous.
Tidak mengembalikan nilai ambigu.
Boolean hanya digunakan untuk operasi berhasil/gagal sederhana.
Collection wajib bersifat read-only.
Object hasil diagnosa harus berupa snapshot.
19. Exception Rules

Seluruh exception publik wajib berupa CMSException.

Tidak diperbolehkan melempar:

Error
TypeError
ReferenceError

langsung ke consumer API.

Semua exception harus memiliki:

code
message
context
timestamp

sesuai Error Contract pada Kernel-Architecture.md.

