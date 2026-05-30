# White-Label Security Auditor API

Build prompt security auditing directly into your consultancy or SaaS platform — fully branded as your own.

**[Contact for White-Label Access →](mailto:thecodehaider@gmail.com?subject=White-Label%20Security%20Auditor%20API%20Inquiry)**

---

## What Is the White-Label API?

The White-Label Security Auditor API is an enterprise tier of the Prompt Injection Scanner that lets you embed our scanning engine inside your own products and client offerings — with **zero Decodes Future branding**.

Your clients see your brand. We power the intelligence underneath.

---

## Who It's For

### AI Security Consultancies
Offer prompt security auditing as a billable service. Generate branded PDF reports for clients after each engagement. Bill at your own rates.

### SaaS Platforms
Integrate prompt security as a native feature of your developer platform. Add a "Security Audit" button to your prompt editor. Show your users a risk score before they deploy.

### Managed Security Service Providers (MSSPs)
Extend your existing security portfolio with LLM-specific threat analysis. Deliver OWASP LLM Top 10 2025 compliance assessments to clients at scale.

### Enterprise Compliance Teams
Run automated prompt audits as part of your internal AI governance workflow. Gate AI deployments on risk score thresholds. Generate audit trails for SOC 2 reviews.

---

## What's Included

| Feature | Details |
|---|---|
| **Dedicated endpoint** | Your own isolated scanning endpoint at `api.decodesfuture.com/white-label/{your-id}/scan` |
| **Custom branding** | All references to Decodes Future removed from API responses and reports |
| **White-labeled reports** | PDF audit reports with your logo, company name, and color scheme |
| **Custom rate limits** | Negotiated SLA — from 10,000 to 1,000,000+ scans/month |
| **Dedicated compute** | Isolated inference queue — your scans never share resources with other customers |
| **Custom thresholds** | Define your own risk score pass/fail thresholds for client SLAs |
| **Onboarding support** | Direct engineer onboarding session and integration support |
| **SOC 2 documentation** | Compliance evidence package for your own SOC 2 assessments |
| **SLA guarantee** | 99.9% uptime SLA with dedicated support channel |

---

## Pricing

| Tier | Monthly Scans | Price |
|---|---|---|
| **Agency Starter** | Up to 10,000 scans | $199/mo |
| **Agency Pro** | Up to 50,000 scans | $349/mo |
| **Enterprise** | Unlimited | $499/mo + custom |

All tiers include custom branding, dedicated endpoint, and onboarding support.  
Enterprise includes dedicated compute, custom SLA, and volume pricing for very high throughput.

---

## How It Works

1. **You contact us** with your use case and expected scan volume
2. **We provision** your dedicated endpoint and white-label credentials
3. **We onboard** you with a 1:1 engineer session — integration typically takes under 1 day
4. **You integrate** the endpoint into your product or workflow
5. **You deliver** branded security audits to your clients

---

## API Integration

The white-label endpoint is identical to the standard API. Just replace the base URL and use your white-label key:

```bash
curl -X POST https://decodesfuture.com/api/white-label/{your-id}/scan \
  -H "x-api-key: YOUR_WHITE_LABEL_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Your system prompt here"}'
```

The response structure is identical to the standard API — your existing integration code works without changes.

---

## White-Labeled PDF Reports

Each scan can generate a branded PDF report containing:

- Your company logo and name
- Executive summary and risk score visualization
- Full OWASP LLM Top 10 2025 findings table
- Severity-ranked remediation recommendations
- Hardened prompt rewrite
- Generated adversarial attack payloads
- Compliance attestation signature

PDF generation endpoint:

```bash
curl -X POST https://decodesfuture.com/api/white-label/{your-id}/scan/report \
  -H "x-api-key: YOUR_WHITE_LABEL_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "...", "format": "pdf", "client_name": "Acme Corp"}' \
  --output audit-report.pdf
```

---

## FAQ

**Can I resell this to my clients?**  
Yes. White-label access grants full rights to resell prompt security auditing services powered by our engine.

**Is there a setup fee?**  
No setup fee. Pricing is monthly subscription only.

**How long does onboarding take?**  
Most integrations are live within 24–48 hours of sign-up.

**What models power the scanning engine?**  
We use a multi-model ensemble internally for maximum detection accuracy. The engine is continuously updated as new attack techniques emerge.

**Can I customize what the API returns?**  
Yes — on the Enterprise tier, we can customize response schemas, add custom finding categories, and integrate with your existing data models.

**Do you offer an on-premise deployment?**  
Contact us to discuss on-premise options for high-security environments.

---

## Get Started

Email us with your use case and expected monthly scan volume:

📧 [thecodehaider@gmail.com](mailto:thecodehaider@gmail.com?subject=White-Label%20Security%20Auditor%20API%20Inquiry&body=Hi%20Decodes%20Future%20Team%2C%0A%0AI'm%20interested%20in%20the%20White-Label%20Security%20Auditor%20API.%0A%0AUse%20case%3A%20%5BDescribe%20your%20use%20case%5D%0AExpected%20monthly%20scans%3A%20%5BYour%20estimate%5D%0ACompany%3A%20%5BYour%20company%5D%0A%0ABest%20regards)

We typically respond within 1 business day.

---

**[Back to Main README](../README.md)** · **[API Reference](./api-reference.md)** · **[Pricing](https://decodesfuture.com/pricing)**
