# Reduction Comparison Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single reduction animation with a side-by-side comparison of random thinning and the proposed importance-aware method.

**Architecture:** Keep the project as a single static `index.html`. Add one lightweight Node-based structural test that verifies the comparison UI and script hooks exist before changing production HTML.

**Tech Stack:** Static HTML, CSS, Canvas 2D, vanilla JavaScript, Node.js `fs` assertions.

## Global Constraints

- No new frontend framework or build step.
- Preserve the existing page content outside the decimation block.
- The comparison must show the same final point reduction on both sides, while ESR differs.
- The animation must make structural members visibly survive better in the proposed method.

---

### Task 1: Structural Test

**Files:**
- Create: `scripts/check-reduction-animation.js`

**Interfaces:**
- Consumes: `index.html`
- Produces: a command that exits non-zero until the comparison UI exists

- [ ] **Step 1: Write the failing test**

Create a Node script that checks for both comparison panels, both canvases, both ESR metrics, the shared reduction copy, and the new scoring function.

- [ ] **Step 2: Run test to verify it fails**

Run: `node scripts/check-reduction-animation.js`
Expected: FAIL because the current page has one `decimCanvas` and no comparison UI.

### Task 2: Comparison UI and Animation

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: existing `#decim` section and canvas animation code
- Produces: `randomCanvas`, `guidedCanvas`, metric elements, and synchronized animation logic

- [ ] **Step 1: Replace the decimation canvas markup**

Use two panels: `単純な間引き` and `提案手法`. Keep the final point count equal on both sides.

- [ ] **Step 2: Replace animation logic**

Generate one synthetic building point set. The random path removes points uniformly. The guided path uses `scoreImportance` so columns, beams, diagonals, and edges remain dense.

- [ ] **Step 3: Verify**

Run: `node scripts/check-reduction-animation.js`
Expected: PASS.

Open `http://localhost:4173`, confirm the comparison renders, and verify the canvas is nonblank.
