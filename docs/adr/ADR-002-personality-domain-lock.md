# ADR-002: Personality Domain Isolation & Locking
**Date:** 2026-08-06  
**Status:** APPROVED  
**Deciders:** Lead Software Architect, Core Engineering Team  

## Context
Domain Personality (Engine, Assessment, Scoring, Question Bank, dan Result Engine) adalah modul inti yang stabil sejak BUILD 127.

## Decision
Domain Personality dinyatakan **LOCKED TOTAL / FROZEN**. Seluruh modul JavaScript Runtime dan stylesheet khusus di `features/personality/` tidak boleh diubah oleh sprint penyempurnaan UI global.

## Consequences
- **Positive:** Menjamin nol risiko regresi (*zero regression*) pada algoritma tes kepribadian pengguna.
- **Negative:** Penyesuaian visual pada domain personality hanya diperbolehkan melalui override yang sangat terisolasi.