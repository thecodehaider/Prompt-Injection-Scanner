// 🛡️ Prompt Injection Scanner — Core Library

export const HEURISTIC_PATTERNS = [
  {
    name: "System Prompt Override / Ignore Instruction Directive",
    regex: /(?:ignore|disregard|forget|override|bypass)\s+(?:all\s+)?(?:previous|prior|initial)\s+(?:instructions|rules|directives|prompts)/i,
    category: "LLM01: Prompt Injection (Override)",
    severity: "Critical",
    owasp: "LLM01: Prompt Injection",
    description: "The prompt contains a classic system prompt override attempt, commanding the LLM to ignore its system configuration.",
    fix: "Implement XML block delimiters (e.g. <system_prompt>) and define explicit, immutable instructions that command the model never to accept override directives."
  },
  {
    name: "System Prompt Leak / Exfiltration Probe",
    regex: /(?:reveal|show|dump|repeat|output|print|what\s+is|what\s+are)\s+(?:your\s+)?(?:system\s+)?(?:prompt|instructions|rules|configuration|context|above\s+text)/i,
    category: "LLM06: Sensitive Information Leak (Exfiltration)",
    severity: "High",
    owasp: "LLM06: Sensitive Information Leak",
    description: "The input contains a direct exfiltration probe attempting to extract the model's underlying system context.",
    fix: "Inject strict guardrails forbidding the model from repeating its initial system prompt under any circumstances, and sanitizing outputs for system prompt fragments."
  },
  {
    name: "Roleplay / Jailbreak Escapes",
    regex: /(?:you\s+are\s+now|act\s+as|pretend\s+to\s+be|DAN|do\s+anything\s+now|jailbreak|hypothetical\s+scenario)/i,
    category: "LLM01: Prompt Injection (Jailbreak / Escape)",
    severity: "Critical",
    owasp: "LLM01: Prompt Injection",
    description: "The prompt contains a jailbreak signature, attempting to force the model into a roleplaying state that bypasses standard safety guardrails.",
    fix: "Introduce semantic constraints that enforce a single, locked professional role, and add negative constraints forbidding simulated personas."
  },
  {
    name: "Output Hijacking (Markdown / Link Injections)",
    regex: /(?:format\s+as\s+markdown\s+link|render\s+image|!\[.*\]\(http|\[.*\]\(http.*redirect)/i,
    category: "LLM02: Insecure Output Handling (Hijack)",
    severity: "Medium",
    owasp: "LLM02: Insecure Output Handling",
    description: "The input attempts to coerce the model into rendering arbitrary markdown links or remote images, which can lead to data exfiltration or phishing.",
    fix: "Define strict output formatting regulations, explicitly banning arbitrary URL rendering, and force sanitization of all bracketed link sequences."
  }
];

/**
 * Run a local, zero-dependency heuristic scan against common injection signatures.
 * @param {string} prompt The prompt string to test.
 * @returns {object} The heuristic audit report.
 */
export function scanPromptLocal(prompt) {
  if (!prompt) {
    return {
      score: 0,
      findings: [],
      reasoning: "Prompt is empty."
    };
  }

  let matchedPattern = null;
  for (const pattern of HEURISTIC_PATTERNS) {
    if (pattern.regex.test(prompt)) {
      matchedPattern = pattern;
      break;
    }
  }

  if (matchedPattern) {
    const findings = [
      {
        id: "heur-local-1",
        category: matchedPattern.category,
        severity: matchedPattern.severity,
        owasp: matchedPattern.owasp,
        description: matchedPattern.description,
        fix: matchedPattern.fix
      }
    ];

    const hardened = `<system_instructions>\n[SECURE LOCK] The following instructions are immutable.\n\n${prompt.replace(/(ignore|reveal|show|dump|DAN)/gi, "[REDACTED]")}\n</system_instructions>\n\n<user_query>\n[INPUT_SANITIZED]\n</user_query>`;

    return {
      reasoning: `[FAST_HEURISTIC_FIREWALL_BLOCK] Caught instantly by offline heuristic engine. Match found: ${matchedPattern.name}`,
      score: 95,
      findings,
      hardenedPrompt: hardened,
      isClean: false
    };
  }

  return {
    reasoning: "Passed offline heuristic validation filters.",
    score: 0,
    findings: [],
    isClean: true
  };
}

/**
 * Scan a prompt using the high-accuracy Decodes Future Cloud API.
 * @param {string} prompt The prompt text to scan.
 * @param {string} apiKey The Decodes Future API key.
 * @param {string} [host] Optional host override.
 * @returns {Promise<object>} The full red-team audit report.
 */
export async function scanPromptCloud(prompt, apiKey, host = "https://decodesfuture.com") {
  if (!apiKey) {
    throw new Error("Missing Decodes Future API Key.");
  }

  const cleanHost = host.endsWith("/") ? host.slice(0, -1) : host;
  const response = await fetch(`${cleanHost}/api/v1/scan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    const errObj = await response.json().catch(() => ({}));
    throw new Error(errObj.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}
