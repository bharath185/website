# Prigenix AI Knowledge Base

This folder contains the long-form source material for Prigenix AI responses. Keep it in sync with the `SYSTEM_PROMPT` in `src/components/landing/AICommandEditor.jsx`.

## Files

- `prigenix-overview.md` — Company mission, values, engagement models, and high-level results.
- `services.md` — Detailed descriptions of all six service lines.
- `process.md` — Discover → Design → Build → Deploy → Optimize process.
- `tech-stack.md` — Frontend, backend, AI, cloud, IoT, and security technologies.
- `case-studies.md` — Representative client outcomes and metrics.
- `faq.md` — Common questions and detailed answers.

## How to update the AI

1. Edit the relevant markdown file.
2. Update the `ABOUT PRIGENIX` section and examples inside `SYSTEM_PROMPT` in `AICommandEditor.jsx` so the model has the latest concise facts at prompt time.
3. If a question should trigger the card selection flow, make sure the answer follows the `SelectionResponse` JSON schema described in the system prompt.
4. Run `npm run lint` and `npm run build` to verify changes.

## Tone guidelines

- Human, warm, and direct — like a senior Prigenix engineer.
- Specific over generic. Mention real services, process steps, or results.
- No robotic disclaimers. No invented client names.
