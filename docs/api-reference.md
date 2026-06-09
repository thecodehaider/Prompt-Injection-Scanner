# API Reference

Complete reference for the Prompt Injection Scanner REST API.

**Base URL**: `https://www.quantizelab.dev/api/v1`

**[Get your API key →](https://www.quantizelab.dev/pricing)**

---

## Authentication

All API requests require an API key passed in the request header:

```
x-api-key: your_api_key_here
```

Generate your key from your profile at [quantizelab.dev/profile](https://www.quantizelab.dev/profile) under the **API Gateway** tab. Requires a **Pro** or **Team** plan.

---

## Endpoints

### 1. POST /scan
Runs a full prompt injection security audit on a given system prompt.

#### Request
**Method**: `POST`  
**URL**: `https://www.quantizelab.dev/api/v1/scan`  
**Content-Type**: `application/json`

##### Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `prompt` | `string` | ✅ Yes | The system prompt to audit. Max 1,500 chars on Free; unlimited on Pro/Team. |

##### Example Request
```bash
curl -X POST https://www.quantizelab.dev/api/v1/scan \
  -H "x-api-key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "You are a helpful AI assistant. Answer the user truthfully."}'
```

#### Response
```json
{
  "score": 82,
  "reasoning": "...",
  "findings": [
    {
      "id": "f1",
      "category": "LLM01: Prompt Injection (Override)",
      "severity": "Critical",
      "owasp": "LLM01: Prompt Injection",
      "description": "...",
      "fix": "..."
    }
  ],
  "payloads": [],
  "hardenedPrompt": "..."
}
```

---

### 2. POST /mcp-audit
Performs a rigorous security audit on an MCP tool schema or description to find description poisoning and schema argument weaknesses.

#### Request
**Method**: `POST`  
**URL**: `https://www.quantizelab.dev/api/v1/mcp-audit`  
**Content-Type**: `application/json`

##### Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `schema` | `string \| object` | ✅ Yes | The JSON schema of the MCP tool to audit. |

##### Example Request
```bash
curl -X POST https://www.quantizelab.dev/api/v1/mcp-audit \
  -H "x-api-key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"schema": "{\"name\": \"run_cmd\", \"description\": \"Execute command line tasks\"}"}'
```

#### Response
```json
{
  "score": 45,
  "vulnerabilities": [
    {
      "category": "Permission Escalation",
      "severity": "High",
      "issue": "run_cmd tool execution description",
      "impact": "An attacker could poison the tool description to force arbitrary cmd executions.",
      "remediation": "Constrain commands to pre-defined safe parameters or enums."
    }
  ]
}
```

---

### 3. POST /harden
Rewrites system prompts into hardened, injection-resistant, production-grade versions.

#### Request
**Method**: `POST`  
**URL**: `https://www.quantizelab.dev/api/v1/harden`  
**Content-Type**: `application/json`

##### Body Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `prompt` | `string` | ✅ Yes | The raw system prompt context to harden. |

##### Example Request
```bash
curl -X POST https://www.quantizelab.dev/api/v1/harden \
  -H "x-api-key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "You are a helpful assistant."}'
```

#### Response
```json
{
  "hardenedPrompt": "<system_instructions>\n[IMMUTABLE] ...\n</system_instructions>"
}
```

---

## Rate Limits & Plans

| Tier | Scans/Day | Prompt Length | API Access | API Quota | Monthly Price |
|---|---|---|---|---|---|
| **Free** | 5 | 1,500 chars | ❌ | — | $0 |
| **Pro** | Unlimited | Unlimited | ✅ | 500 calls/mo | **$14.99/mo** |
| **Team** | Unlimited | Unlimited | ✅ | Unlimited | **$49.99/mo** |

→ **[Get API key & Upgrade plans](https://quantizelab.dev/pricing)**
