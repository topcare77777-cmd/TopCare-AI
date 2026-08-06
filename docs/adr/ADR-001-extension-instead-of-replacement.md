# ADR-001: Extension Pattern Over Full Replacement Strategy
**Date:** 2026-08-06  
**Status:** APPROVED  
**Deciders:** Lead Software Architect, Senior Frontend Architect  

## Context
Pada pengembangan BUILD 128.2, diajukan proposal untuk mengganti secara utuh (*Full Replace*) file-file krusial seperti `app.css`, `navbar.css`, dan `card.css`.

## Decision
Kami memutuskan untuk menolak *Full Replacement* dan menerapkan **Incremental Extension Pattern** (`BUILD 128.2A`). Semua token baru dan perbaikan responsif diisolasi ke dalam dua file terpisah: `design.tokens-ext.css` dan `ui-harmonization.css`, kemudian di-append pada bagian paling bawah `app.css`.

## Consequences
- **Positive:** Mencegah *cascade collision*, tidak merusak dependensi BUILD 127/128.1, dan rollback dapat dilakukan secara instan.
- **Negative:** Terdapat dua stylesheet tambahan sementara hingga konsolidasi penuh pada BUILD 130.