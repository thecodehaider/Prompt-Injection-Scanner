# Contributing

Thank you for your interest in improving the Prompt Injection Scanner.

This repository documents the [Prompt Injection Scanner](https://decodesfuture.com/tools/prompt-scanner) hosted at Decodes Future. Contributions are welcome in the following areas:

---

## How to Contribute

### 📖 Documentation Improvements

Found an unclear explanation, missing attack vector, or outdated information?

1. Fork this repository
2. Edit the relevant file in `/docs/`
3. Open a pull request with a clear description of what changed and why

### 💡 New Attack Vectors

Know of a prompt injection technique not covered in our [attack vector reference](docs/attack-vectors.md)?

1. Open a [Feature Request issue](https://github.com/thecodehaider/prompt-injection-scanner/issues/new?template=feature_request.yml)
2. Describe the attack technique, include example payloads, and explain why current prompts are vulnerable
3. We'll review, test it in the scanner, and add it to the detection engine

### 🐛 Bug Reports

Found something wrong with the scanner output, API, or documentation?

1. Open a [Bug Report issue](https://github.com/thecodehaider/prompt-injection-scanner/issues/new?template=bug_report.yml)
2. Include the prompt you scanned (if not sensitive), the unexpected behavior, and what you expected instead

### 🔒 Security Vulnerabilities

**Do not open a public issue.** See [SECURITY.md](SECURITY.md) for our private disclosure process.

---

## What We Won't Merge

- Changes to the scanner's core logic (that lives in our private codebase)
- Changes promoting bypassing or defeating security scanners
- Spam, promotional content, or off-topic additions

---

## Style Guide for Documentation

- Use plain English. Avoid jargon where possible.
- Keep paragraphs short — max 4 sentences.
- Use code blocks for all example prompts and payloads.
- Always include a "Fix" or remediation alongside any attack technique described.
- Link back to [decodesfuture.com/tools/prompt-scanner](https://decodesfuture.com/tools/prompt-scanner) where relevant.

---

Thank you for helping make LLM applications more secure.
