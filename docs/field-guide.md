# Field Guide: Circuit Mapping

Quick reference for documenting electrical circuits.

## Time Estimate

| Phase | Duration |
|-------|----------|
| Pre-work | 30 min |
| Panel Audit | 15-30 min/panel |
| Circuit Tracing | 2-4 hours |
| Documentation | 30-60 min |
| Verification | 30-60 min |

**Total: 4-8 hours per property**

## Tools Needed

- Circuit tracer (Fluke BK120 or similar)
- Non-contact voltage tester (NCVT)
- Outlet tester
- Painter's tape + permanent marker
- Camera/phone
- This guide

## Phase 1: Panel Audit

1. **Locate all panels** - Main, sub-panels, garage, outdoor
2. **Assign IDs** - M (Main), S1 (Sub-panel 1), G (Garage), etc.
3. **Photograph** - Panel exterior, door open, interior (carefully)
4. **Inventory breakers** - Number, amps, type (AFCI/GFCI), wire gauge

**Look for:**
- Double-pole breakers (240V) - easy wins
- Handle-tied breakers (MWBCs) - document both numbers
- Wire gauge violations (20A breaker with 14 AWG = problem)

## Phase 2: Circuit Tracing

### Room Traversal

**Pattern:** Clockwise from entry, floor-to-ceiling at each wall

**Order:**
1. Entry, living areas, hallways
2. Kitchen (most complex)
3. Bathrooms (GFCI circuits)
4. Bedrooms
5. Utility, laundry, mechanical
6. Garage, basement
7. Attic
8. **Exterior** (often forgotten!)

### For Each Device

1. Insert tracer transmitter (or use socket adapter for lights)
2. Scan panel with receiver - note strongest signal
3. **Verify:** Turn indicated breaker OFF
4. Confirm device is dead with NCVT
5. Turn breaker ON
6. Mark device with painter's tape: breaker number
7. Log in spreadsheet/app

### Special Cases

**GFCI outlets:** Note what's protected downstream

**3-way switches:** Document all switch locations, identify LINE side

**Split receptacles:** Test BOTH halves - may be different circuits

**MWBCs:** Document BOTH breaker numbers, verify handle tie

## Phase 3: Documentation

1. Transfer tape marks to JSON data file
2. Generate NFC tag URLs
3. Mark cover plate backs with permanent marker: `28-M-12`
4. Print panel schedule if desired

## Phase 4: Verification

- [ ] Test 20% of circuits randomly (breaker off, NCVT check)
- [ ] Test all GFCIs (press TEST, verify trip, RESET)
- [ ] Test all AFCIs
- [ ] Verify every breaker has documentation
- [ ] Check exterior circuits included

## JSON Data Entry

For each circuit, add to the property's JSON file:

```json
{
  "id": "28-M-12",
  "breaker": 12,
  "amps": 20,
  "poles": 1,
  "description": "Kitchen Counter East",
  "rooms": ["KIT"],
  "wire": "12/2",
  "protection": "GFCI-Outlet",
  "type": "General",
  "critical": false,
  "notes": "GFCI protects island outlet downstream"
}
```

## Common Mistakes

| Mistake | Prevention |
|---------|------------|
| Missing exterior circuits | Mandatory exterior walk |
| Trusting old labels | Always verify with NCVT |
| Forgetting split receptacles | Test both halves |
| Not documenting MWBCs | Look for 3-wire cables, handle ties |
| Vague descriptions | Include room + location + device type |
