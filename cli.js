#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { scanPromptLocal, scanPromptCloud } from "./index.js";

const HELP_TEXT = `
🛡️  Prompt Injection Scanner CLI

Usage:
  npx prompt-scanner --prompt "..."                 Run local offline heuristic scan
  npx prompt-scanner --prompt "..." --cloud --key x  Run full high-accuracy cloud red-team audit

Options:
  -p, --prompt <text>      The prompt text to audit.
  -c, --cloud              Run deep cloud AI audit (requires API key).
  -k, --key <value>        Your Quantize Lab API Key (or set QUANTIZE_API_KEY env).
  --host <url>             Override API host (default: https://quantizelab.dev).
  -h, --help               Show this help message.
`;

async function main() {
  // Helper to load keys from local .env files
  function loadLocalEnv() {
    const envPath = path.join(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      try {
        const content = fs.readFileSync(envPath, "utf-8");
        const lines = content.split(/\r?\n/);
        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith("#")) {
            const firstEqual = trimmed.indexOf("=");
            if (firstEqual !== -1) {
              const key = trimmed.substring(0, firstEqual).trim();
              const val = trimmed.substring(firstEqual + 1).trim();
              const cleanVal = val.replace(/^["']|["']$/g, "");
              if (key === "QUANTIZE_API_KEY" || key === "QUANTIZELAB_API_KEY") {
                process.env[key] = cleanVal;
              }
            }
          }
        }
      } catch (e) {
        // Silently skip if error reading local .env
      }
    }
  }

  loadLocalEnv();
  const args = process.argv.slice(2);
  let prompt = null;
  let useCloud = false;
  let apiKey = process.env.QUANTIZE_API_KEY || process.env.QUANTIZELAB_API_KEY;
  let host = "https://quantizelab.dev";

  for (let i = 0; i < args.length; i++) {
    if ((args[i] === "--prompt" || args[i] === "-p") && args[i + 1]) {
      prompt = args[i + 1];
      i++;
    } else if (args[i].startsWith("--prompt=")) {
      prompt = args[i].split("=")[1];
    } else if (args[i] === "--cloud" || args[i] === "-c") {
      useCloud = true;
    } else if ((args[i] === "--key" || args[i] === "-k") && args[i + 1]) {
      apiKey = args[i + 1];
      i++;
    } else if (args[i].startsWith("--key=")) {
      apiKey = args[i].split("=")[1];
    } else if (args[i] === "--host" && args[i + 1]) {
      host = args[i + 1];
      i++;
    } else if (args[i].startsWith("--host=")) {
      host = args[i].split("=")[1];
    } else if (args[i] === "--help" || args[i] === "-h") {
      console.log(HELP_TEXT);
      return;
    }
  }

  if (!prompt) {
    console.log(HELP_TEXT);
    return;
  }

  if (useCloud) {
    console.log("🌐 Running deep Cloud red-team scan...");
    if (!apiKey) {
      console.error("Error: Cloud scanning requires an API Key (--key or QUANTIZE_API_KEY env).");
      process.exit(1);
    }

    try {
      const report = await scanPromptCloud(prompt, apiKey, host);
      const score = report.risk_score || 0;
      let scoreColor = "\x1b[32m"; // Green
      if (score >= 40) scoreColor = "\x1b[33m"; // Yellow
      if (score >= 70) scoreColor = "\x1b[31m"; // Red

      console.log(`🛡️  Risk Score: ${scoreColor}${score}/100\x1b[0m`);
      if (report.findings && report.findings.length > 0) {
        console.log("\nfindings:");
        for (const f of report.findings) {
          console.log(`  - [${f.severity}] ${f.category}`);
          console.log(`    Issue: ${f.description}`);
          console.log(`    Fix:   ${f.fix}`);
        }
      } else {
        console.log("\n\x1b[32m✨ Clean! No vulnerabilities detected.\x1b[0m");
      }
    } catch (e) {
      console.error(`Error during cloud scan: ${e.message}`);
      process.exit(1);
    }
  } else {
    console.log("⚡ Running local offline heuristic scan...");
    const report = scanPromptLocal(prompt);

    if (!report.isClean) {
      console.log(`\n\x1b[31m⚠️  Vulnerability Caught by Firewall!\x1b[0m`);
      console.log(`🛡️  Risk Score: \x1b[31m${report.score}/100\x1b[0m`);
      console.log(`Reasoning: ${report.reasoning}`);
      
      for (const f of report.findings) {
        console.log(`\n  - [${f.severity}] ${f.category}`);
        console.log(`    Issue: ${f.description}`);
        console.log(`    Fix:   ${f.fix}`);
      }
    } else {
      console.log("\n\x1b[32m✨ Local heuristic firewall passed successfully!\x1b[0m");
    }
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
