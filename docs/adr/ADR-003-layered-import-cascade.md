# ADR-003: Layered Import Order in Master CSS Loader
**Date:** 2026-08-06  
**Status:** APPROVED  
**Deciders:** Lead Software Architect, Frontend Architecture Team  

## Context
Pengelolaan CSS pada platform besar rentan terhadap konflik spesifisitas jika urutan pemanggilan file tidak diatur secara ketat.

## Decision
Menetapkan alur eksekusi sekuensial di dalam `app.css` dengan urutan 8 Layer: `Tokens -> Core -> Components -> Layout -> Features -> Personality Domain -> Pages -> Extensions`.

## Consequences
- **Positive:** Urutan evaluasi CSS dapat diprediksi secara presisi; gaya extension selalu mengungguli gaya dasar tanpa butuh `!important`.
- **Negative:** Pengembang wajib mematuhi aturan penempatan layer dan dilarang mengubah urutan import `app.css`.