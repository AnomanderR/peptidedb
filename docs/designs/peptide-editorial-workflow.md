# Editorial Workflow — Peptide Coverage Pipeline

> Companion doc to [peptide-coverage-pipeline.md](./peptide-coverage-pipeline.md). Answers Codex's open question: "Who performs human review, at what daily throughput?"
>
> Drafted 2026-04-26. **Status: DECIDED 2026-04-26.** Reviewer = Alex (founder). Throughput = 3-4 plates/day at 4 hr/day. Wave 1 (17 plates) is the calibration batch — re-evaluate cadence and add a domain advisor (Wave 3) before bioregulators ship.

## The bottleneck

The pipeline (AI draft → PubMed lookup → claim-linker → schema audit) compresses *drafting*. It does NOT compress *peer-grade source curation*. For each plate, a human still has to:

1. Read the AI-drafted plate (10-15 min/plate)
2. Read the abstract or full text of every cited paper (~5 min/citation × 7-10 citations = 35-50 min/plate)
3. Verify the AI's claim ↔ source mapping is accurate (handled mostly by claim-linker; flagged claims need manual review, ~5-15 min/plate)
4. Edit the editorial copy for voice + DESIGN.md compliance (~10-15 min/plate)
5. Promote `maturity: auto-drafted` → `human-reviewed` and merge

**Per-plate review time: 60-90 minutes for well-evidenced peptides. 90-120 minutes for medium evidence. 60-90 minutes for bioregulators (less to read, more editorial care).**

## Throughput math

For 57 net-new plates:

| Reviewer count | Hours/day | Plates/day | Days to finish |
|---|---|---|---|
| 1 (solo maintainer) | 4 | 3-4 | 14-19 working days (~3-4 weeks calendar) |
| 1 (full-time) | 8 | 6-8 | 7-9 working days |
| 2 (split waves) | 4 each | 6-8 combined | 7-9 working days |
| 3 (one per wave) | 2-4 each | 9-12 combined | 5-6 working days |

**Reality check**: AI compresses pipeline-build (one-time, ~3 hr CC). It does NOT compress this. Plan accordingly.

## Roles to fill

### Editorial maintainer — primary

**Responsibilities:**
- Review every AI-drafted plate before promotion to `human-reviewed`.
- Hold the editorial voice (DESIGN.md compliance: no medical claims, no dosing recommendations, hairline aesthetics, italic Instrument Serif used sparingly, etc.).
- Decide tier when claim-linker flags a citation as low-confidence.
- Final say on `evidence_tier` + `maturity` per plate.

**Throughput target**: **3-4 plates/day** at 4 hr/day (calibration pace; matches Wave 1 wall-clock estimate of ~15-20 working days for 17 plates).

**Person**: **Alex (founder).** Solo reviewer for Wave 1. Editorial-control rationale: pipeline calibration matters most on the first batch, and the founder owns the brand voice + DESIGN.md compliance bar.

### Editorial reviewer — secondary (optional)

**Responsibilities:**
- Second-pair-of-eyes for the bioregulator wave specifically (highest editorial risk).
- Sanity-check the `evidence_tier` calls for Russian-tradition peptides.

**Person**: **Deferred.** Wave 1 ships solo. Re-evaluate before Wave 3 (bioregulators) — that's where editorial framing risk concentrates and a domain advisor would add the most value. If pipeline + claim-linker quality holds through Wave 1, consider recruiting a Khavinson-school-aware reviewer for Wave 3 only.

### Pipeline operator (one-time, can be the maintainer)

**Responsibilities:**
- Run `bun run gen:plate <name>` per plate.
- Watch the audit gate; if claim-linker flags >3 citations as low-confidence, escalate to the maintainer immediately (suggests AI drift).
- Commit drafted plates with clear messages.

## Workflow per plate

```
  ┌─ 1. operator: bun run gen:plate <name>  (~30 sec)
  │   └─ AI draft + PubMed lookup + claim-linker = drafted YAML written
  │
  ├─ 2. operator: bun run audit:trust  (~5 sec)
  │   └─ Schema audit; abort if any P0 (citation missing, schema error)
  │
  ├─ 3. operator: open YAML in editor  (manual)
  │   └─ Confirm structure looks reasonable; if not, regenerate
  │
  ├─ 4. operator: commit draft  (~30 sec)
  │   └─ git add content/peptides/<slug>.yaml content/refs.yaml
  │      git commit -m "feat(plate): <name> draft (auto-drafted, awaiting review)"
  │
  ├─ 5. maintainer: pull + review  (~60-90 min)
  │   ├─ Read every claim
  │   ├─ Spot-check every citation against the abstract
  │   ├─ Edit editorial copy for voice + DESIGN.md compliance
  │   ├─ Decide evidence_tier
  │   └─ Promote maturity: auto-drafted → human-reviewed
  │
  └─ 6. maintainer: commit + push  (~30 sec)
      └─ git commit -m "review(plate): <name> human-reviewed"
         git push origin main
         (CI runs audit:trust + tests; vercel deploys)
```

**Cadence**: batch 3-5 drafts per `gen:plate` session, then review them as a batch. Avoids context-switching cost.

## Quality gates

A plate cannot be promoted past `auto-drafted` until:
- ✅ All citations resolved (PubMed lookup verified PMIDs exist + populated refs.yaml)
- ✅ Claim-linker flagged claims have been manually reviewed
- ✅ Editorial pass for voice + DESIGN.md compliance
- ✅ Schema audit passes (`audit:trust` clean)

A plate cannot ship to production at all until:
- ✅ `maturity: human-reviewed` minimum
- ✅ Audit + tests + build green
- ✅ Spot-check on local preview (URL renders, motif renders, citations link out correctly)

## Rejection criteria

A drafted plate should be **rejected and not merged** if:
- Claim-linker flags >50% of citations as low-confidence (suggests AI drifted; regenerate with tighter prompt)
- AI invented a non-existent peptide variant (e.g., draft references "BPC-157 LR3" — not a real thing)
- AI cites Russian-only literature for a Western-evidence peptide (cross-tradition mixing without policy framing)
- Plate violates DESIGN.md § 1 guarantees (claim without citation, medical advice, dosing recommendation)

## Daily review log

Track per-day plate review velocity in a JSONL file (one entry per reviewed plate):

```jsonl
{"date":"2026-04-29","slug":"cagrilintide","reviewer":"alex","start":"09:00","end":"10:15","outcome":"merged","notes":"3 citations flagged by linker; 2 confirmed valid, 1 swapped"}
```

Persist at `~/.gstack/projects/peptidesdb/editorial-log/<date>.jsonl` for retro tracking.

## Pause conditions

Stop drafting + reviewing if:
- Claim-linker false-positive rate exceeds 30% over 5 consecutive plates (suggests claim-linker prompt needs tuning, not the drafting prompt)
- 3 plates in a row need to be regenerated due to AI drift (suggests model regression — try different model)
- Maintainer review backlog exceeds 10 unreviewed `auto-drafted` plates (drafting is faster than reviewing — stop drafting until backlog clears)

---

**Action for maintainer**: fill in the TBD fields above before Phase 0 starts. The pipeline build is meaningless without a clear answer to "who reviews and at what throughput".
