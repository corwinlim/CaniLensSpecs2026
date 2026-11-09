# Reproduce the CaniLens HUD (manual prototype)

> **Status:** Manual reconstruction guide. The original Lens Studio `cani.esproj` and scene resources are **not yet in this public repository**. This document must not be presented as evidence of CLAD/MCP use, SPECS hardware testing, or a complete reproducible source release.

## What this guide reproduces

A four-line Lens Studio screen-space text HUD driven by `Assets/CaniLensHUDBuild50.js`, with an IDLE → INTERPRET → RESET → IDLE state cycle and a permanent `FIXTURE DEMO` disclosure.

This is a **synthetic fixture demo**. No pet video or audio is analyzed. There is no behavioral classifier, diagnosis, network model, or SIK gesture verification.

## Requirements

- Lens Studio 5.23.2 or another compatible Lens Studio version. The builder's Native Preview report was on 5.23.2.
- A SPECS Base Template project (create a **new temporary project** for manual reconstruction).
- The controller source file at [Assets/CaniLensHUDBuild50.js](Assets/CaniLensHUDBuild50.js).

## Step-by-step manual rebuild

1. Launch Lens Studio. From a **SPECS Base Template**, create a new project and save it.
2. Create a **Screen Text** object (screen-space text preset), name it `HUD_Status`, and set its Text value to `CaniLens | IDLE`. Check that it is visible in Preview before proceeding.
3. Duplicate this screen-space object three times. Name the duplicates `HUD_Signal`, `HUD_Interpretation`, and `HUD_Disclaimer`. Set initial text to `Signal: waiting`, `Observation: pending`, and `FIXTURE DEMO` respectively. Move them apart within the visible screen area.
4. Import `Assets/CaniLensHUDBuild50.js` into the project Asset Browser.
5. Add an empty scene object called `CaniLensControllerBuild50`. Add a **Script** component and select the imported JavaScript file.
6. In the Script Inspector bind the following input fields to their matching **Text components** (not to the Scene Objects' names as strings):

   | Input | Text component |
   | --- | --- |
   | `statusText` | `HUD_Status` |
   | `signalText` | `HUD_Signal` |
   | `interpretationText` | `HUD_Interpretation` |
   | `disclaimerText` | `HUD_Disclaimer` |

7. Set `autoCycle = true`, `cycleSeconds = 4.0`, and `enableTap = false` for the first pass. If another old CaniLens controller is attached, disable it so only one script writes these Text components.
8. Save and start Preview. Observe for **at least 13 seconds** to cover the expected progression.

Expected approximate states: 0s **IDLE**, 4s **INTERPRET**, 8s **RESET**, 12s **IDLE**. The `FIXTURE DEMO` disclaimer must remain visible for all states.

If the Text objects are invisible, check that they use a screen-space preset and a compatible Orthographic Camera/Layer. Do not remove or alter the Base Template's primary camera. If the Inspector doesn't show the declared inputs, check the script asset and Logger.

## Automated mock tests

From the repository root with Node.js:

```bash
node tests/test_build50.js
```

These tests use a simulated Lens Studio event API. They **do not** launch Lens Studio or verify the actual scene, CLAD, SIK, or glasses hardware. A GitHub Actions workflow exists at `.github/workflows/hud-mock-tests.yml`, but its run status must be verified separately.

## Source-release requirements still outstanding

To provide a complete source release, publish the **real project** `cani.esproj`, actual related `Assets/` and necessary Lens Studio scene metadata from the builder's Windows project (not a hand-created replacement), after a file-level secret review. Only include `devpost/` planning documents that genuinely exist and were produced by the hackathon's skill pack.

**Security:** Never commit `signing_key.pem`, `.mcp.json`, bearer tokens, developer credentials, `.env` files, or private keys. Review the Git index and contents before any push; a `.gitignore` file alone does not guarantee safety.

## Claims matrix

| Claim | Evidence status |
| --- | --- |
| Controller source and mock test files on GitHub | Published |
| Native Preview HUD state cycle | Builder reported PASS; no shared original project artifact in this repo |
| Automatic GitHub Actions CI result | Requires live run verification |
| Lens Studio original project reproducible from this repository | **Not yet** |
| CLAD/MCP successfully built the Lens | **Unverified** |
| Real pet behavior detection | **Not implemented** |

Demo: https://youtube.com/shorts/t2ylNLHnJaA?feature=share

Devpost: https://devpost.com/software/canilens-evidence-before-interpretation
