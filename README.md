# CaniLens — Evidence Before Interpretation

**A safety-first AR interface prototype for careful companion-animal observation.**

CaniLens explores a simple design principle: an AR display should distinguish **what we see**, **what it might mean**, and **a cautious next action**—without suggesting that a device can read a dog's mind.

## Current demonstrated prototype

The builder reports that a screen-space HUD in **Lens Studio 5.23.2** successfully displayed and cycled through:

1. **IDLE** — waiting for a simulated observation.
2. **INTERPRET** — showing a fixture-based observation and contextual interpretation.
3. **RESET** — clearing the example and returning to IDLE.

A persistent **FIXTURE DEMO** disclaimer makes clear that this prototype is not a real pet detector or diagnostic tool. The published marketing artwork is **concept art**, not a live sensing or hardware demonstration.

## Technology and verification

- **Lens Studio 5.23.2**: manual scene construction and Native Preview testing, reported by the builder.
- **JavaScript**: HUD state control and fixture demonstration.
- **Codex / AI-assisted development**: scripts and isolated mock tests.
- **Lens Studio MCP and CLAD**: connection and authorization were attempted but **successful CLAD-based construction has not been verified**.
- **SPECS hardware, SIK gesture input, camera/microphone live detection, behavioral inference accuracy**: **not verified**.

> **Source-code status:** The original Lens Studio project is maintained on the builder's local Windows computer. This repository README does **not** imply that the actual `.esproj` and `Assets/` have been uploaded yet. Do not treat this repository as a reproducible source release until those files are present and independently checked.

## Demo and Devpost

- [Devpost project](https://devpost.com/software/canilens-evidence-before-interpretation)
- [Submitted demo URL](https://youtube.com/shorts/t2ylNLHnJaA?feature=share)

## Required files for reproducibility

Publish the actual project files from `CaniLensSpecsSubmission2026` after reviewing them for sensitive data:

- `cani.esproj` plus any actual project metadata/dependencies required to open the scene.
- Relevant `Assets/` including Text objects, controller scripts and required prefab/resources.
- Genuine `devpost/` planning files **if they were actually produced**.

Never invent planning artifacts or claim CLAD operations that did not happen. `.gitignore` is a secondary safeguard, not a substitute for reviewing `git status` and the Git index before publishing.

## Safety and future work

A dog’s posture, vocalization, and micro-behaviors need context. CaniLens does **not** provide veterinary advice or identify an animal’s internal mental state. Future work is proposed veterinary behavior validation, user comprehension studies, and carefully evaluated on-device observation inputs.

---
**Hackathon:** Learn AR with SPECS · **Status:** Devpost submission confirmed, technical eligibility subject to organizers' requirements.
