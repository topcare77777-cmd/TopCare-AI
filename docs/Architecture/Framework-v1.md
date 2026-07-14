# TopCare Framework v1

## Layer

Application

↓

Kernel

↓

Framework

↓

Renderer

↓

Component

↓

Service

↓

Data

↓

Template

---

Semua feature wajib mengikuti arsitektur ini.

Framework bertanggung jawab untuk:

- Event
- Router
- Animation
- Store
- Module Lifecycle

Renderer bertanggung jawab untuk:

- Menghubungkan Template + JSON + Component

Component bertanggung jawab untuk:

- Menghasilkan HTML

Service bertanggung jawab untuk:

- Mengambil data

Module bertanggung jawab untuk:

- Menjalankan feature