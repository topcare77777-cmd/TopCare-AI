# TOPCARE AI PLATFORM V2 — SERVERLESS PROXY GATEWAY SPECIFICATION
**Architecture Version:** 2.0  
**Baseline Build:** BUILD 129.3 (RC)  
**Status:** RELEASE CANDIDATE (RC)  
**Target Runtimes:** Cloudflare Workers, Netlify Functions, Vercel Functions  

---

## 1. Endpoint Overview

* **HTTP Method:** `POST`
* **Route Endpoint:** `/api/newsletter`
* **Content-Type:** `application/json`
* **Access Control:** Public CORS with Allowed Domain Restrictions

---

## 2. Request Contract Payload (Browser Client -> Proxy)

```json
{
  "email": "user@domain.com",
  "source": "footer",
  "provider": "brevo"
}