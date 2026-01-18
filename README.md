# Electrical Documentation

Circuit documentation for residential properties. Anonymous property codes protect privacy while enabling family collaboration.

## Properties

| Code | Panels | Status |
|------|--------|--------|
| 28 | TBD | Not started |
| 14 | TBD | Not started |
| 17 | TBD | Not started |

## Quick Links

- [Circuit Lookup](https://g-shudy.github.io/electrical-docs/app/lookup.html) - NFC tags link here
- [Panel Schedule](https://g-shudy.github.io/electrical-docs/app/panel.html) - Tabular panel schedules
- [Panel Layout](https://g-shudy.github.io/electrical-docs/app/layout.html) - Visual panel representation
- [Search](https://g-shudy.github.io/electrical-docs/app/search.html) - Find by room/description
- [Add Circuit](https://g-shudy.github.io/electrical-docs/app/add.html) - Mobile-friendly data entry

## NFC Tag Format

Tags encode URLs like:
```
https://g-shudy.github.io/electrical-docs/app/lookup.html?c=28-M-12
```

## Data Structure

```
Property (28, 14, 17)
  └── Panel (M=Main, S1=Sub-panel, G=Garage)
        └── Circuit (breaker number)
              └── Device (optional, per-outlet detail)
```

### Panel Fields

| Field | Description |
|-------|-------------|
| manufacturer | Panel brand (Square D, Siemens, Eaton, etc.) |
| model | Model number from panel label |
| series | Product line (QO, Homeline, etc.) |
| total_spaces | Number of breaker slots |
| bus_rating | Bus bar amperage rating |

### Circuit Fields

| Field | Description |
|-------|-------------|
| slots | Slot position(s): "1", "1/3" (double-pole), "7A" (tandem) |
| breaker_model | Breaker catalog number (e.g., QO115CAFI) |
| protection | Protection type: None, GFCI, AFCI, Dual |

## Files

```
data/
  ├── 28.json          # Property 28 circuits
  ├── 14.json          # Property 14 circuits
  └── 17.json          # Property 17 circuits

app/
  ├── index.html       # Property selector
  ├── lookup.html      # Circuit lookup (NFC destination)
  ├── panel.html       # Panel schedule view
  └── search.html      # Search interface

docs/
  ├── field-guide.md   # How to map circuits
  ├── naming.md        # Naming conventions
  └── entities.md      # Data model reference
```

## For Contributors

### Easy Way: Mobile Form (Recommended)

1. Open [Add Circuit](https://g-shudy.github.io/electrical-docs/app/add.html) on your phone
2. Fill in the circuit details
3. Tap "Submit for Review"
4. Confirm on GitHub (creates an issue)
5. Bot automatically validates and adds to the database

### Manual Way: Edit JSON

Edit your property's JSON file and add to the `circuits` array:

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
  "notes": "GFCI at first outlet protects downstream"
}
```

## Field Guide

See [docs/field-guide.md](docs/field-guide.md) for the complete circuit mapping methodology.
