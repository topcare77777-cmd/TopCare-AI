# ADR-004: Scheduled Merge of Extension Stylesheets in BUILD 130
**Date:** 2026-08-06  
**Status:** APPROVED  
**Deciders:** Lead Software Architect, Design System Lead  

## Context
Penggunaan extension stylesheets (`design.tokens-ext.css` dan `ui-harmonization.css`) pada BUILD 128.2A merupakan solusi sementara (*temporary extension*) untuk menjaga stabilitas.

## Decision
Menjadwalkan konsolidasi teknis pada **BUILD 130** untuk melebur seluruh token `--tc-ext-*` ke dalam SSOT `design.tokens.css` utama, serta menghapus file extension setelah refactoring selesai.

## Consequences
- **Positive:** Menjaga kebersihan arsitektur jangka panjang dan mencegah *technical debt* yang menumpuk.
- **Negative:** Membutuhkan satu sprint konsolidasi terdedikasi pada BUILD 130.