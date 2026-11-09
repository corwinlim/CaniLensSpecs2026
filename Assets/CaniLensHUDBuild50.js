// CaniLens Build 50 — Native Screen HUD, FIXTURE DEMO ONLY.
// No microphone, camera observation, animal-intent inference, clinical claims, network, MCP or SIK claims.
// Attach as a Script component to a new scene object, then bind four Component.Text inputs.
// @input Component.Text statusText
// @input Component.Text signalText
// @input Component.Text interpretationText
// @input Component.Text disclaimerText
// @input bool autoCycle = true
// @input float cycleSeconds = 4.0
// @input bool enableTap = true

var STATES = ["IDLE", "INTERPRET", "RESET"];
var stateIndex = 0;
var elapsedSeconds = 0;
var intervalSeconds = (typeof script.cycleSeconds === "number" && script.cycleSeconds >= 1 && script.cycleSeconds <= 30) ? script.cycleSeconds : 4.0;
var disclaimer = "FIXTURE DEMO | NOT REAL ANIMAL INTENT DETECTION";

function render() {
    if (script.statusText) {
        script.statusText.text = "CaniLens | " + STATES[stateIndex];
    }
    if (script.signalText) {
        script.signalText.text = [
            "Signal: waiting for synthetic fixture",
            "Signal: lip lick + head turn (SIMULATED)",
            "Signal: fixture cleared"
        ][stateIndex];
    }
    if (script.interpretationText) {
        script.interpretationText.text = [
            "Observation: no real pet detected",
            "Illustrative hypothesis: uncertainty is possible; context needed. NOT a diagnosis.",
            "Reset complete; returning to IDLE"
        ][stateIndex];
    }
    if (script.disclaimerText) {
        script.disclaimerText.text = disclaimer;
    }
}

function nextState() {
    stateIndex = (stateIndex + 1) % STATES.length;
    elapsedSeconds = 0;
    render();
}

// Render immediately, before registering optional input events.
render();

// Failure to create a TapEvent must not prevent UpdateEvent from registering.
if (script.enableTap) {
    try {
        var tap = script.createEvent("TapEvent");
        if (tap && typeof tap.bind === "function") { tap.bind(nextState); }
    } catch (e) {
        print("CaniLens Build50: TapEvent unavailable; auto-cycle remains available.");
    }
}

try {
    var update = script.createEvent("UpdateEvent");
    if (update && typeof update.bind === "function") {
        update.bind(function () {
            if (!script.autoCycle) { return; }
            var dt = getDeltaTime();
            if (typeof dt !== "number" || !isFinite(dt) || dt <= 0) { return; }
            elapsedSeconds += dt;
            if (elapsedSeconds >= intervalSeconds) { nextState(); }
        });
    } else {
        print("CaniLens Build50: UpdateEvent unavailable. Check Lens Studio Logger.");
    }
} catch (e2) {
    print("CaniLens Build50: UpdateEvent registration failed. Check Lens Studio Logger.");
}
