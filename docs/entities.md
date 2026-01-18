# Data Entities Reference

## Entity Hierarchy

```
Property (28, 14, 17)
  └── Panel (M=Main, S1=Sub-panel, G=Garage, etc.)
        └── Circuit (breaker number)
              └── Device (optional - individual outlets/switches)
```

## Property

Top-level container for a residence.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `property` | string | Yes | Property code (28, 14, 17) |
| `name` | string | No | Display name |
| `service_size` | string | No | Main service amperage (e.g., "200A") |
| `last_audit` | date | No | Last full documentation date |
| `notes` | string | No | General property notes |
| `panels` | array | Yes | Array of Panel objects |
| `maintenance` | array | No | Array of Maintenance records |

## Panel

An electrical panel (main or sub-panel) within a property.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Panel code (M, S1, S2, G, etc.) |
| `name` | string | Yes | Display name (e.g., "Main Panel") |
| `location` | string | Yes | Physical location (e.g., "Garage") |
| `amps` | number | No | Panel amperage rating |
| `fed_from` | string | No | Power source (e.g., "Utility" or "28-M-40/42") |
| `total_spaces` | number | No | Total breaker spaces |
| `circuits` | array | Yes | Array of Circuit objects |

### Panel ID Codes

| Code | Meaning |
|------|---------|
| M | Main Panel |
| S1, S2 | Sub-panel 1, 2 |
| G | Garage Panel |
| E | Emergency/Generator Panel |
| P | Pool/Spa Panel |

## Circuit

A single circuit (breaker) within a panel.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Full circuit ID (e.g., "28-M-12") |
| `breaker` | number | Yes | Breaker slot number |
| `amps` | number | Yes | Breaker amperage (15, 20, 30, etc.) |
| `poles` | number | Yes | 1 for 120V, 2 for 240V |
| `description` | string | Yes | Human-readable description |
| `rooms` | array | No | Room codes served (e.g., ["KIT", "DIN"]) |
| `wire` | string | No | Wire gauge (e.g., "12/2", "10/3") |
| `protection` | string | No | Protection type (see below) |
| `type` | string | No | Circuit type (see below) |
| `critical` | boolean | No | Emergency/critical load |
| `smart_neutral` | boolean | No | Neutral present at switches |
| `verified` | date | No | Last verification date |
| `notes` | string | No | Additional notes |

### Protection Types

| Value | Meaning |
|-------|---------|
| `None` | Standard breaker |
| `GFCI-Breaker` | GFCI at panel |
| `GFCI-Outlet` | GFCI receptacle in circuit |
| `AFCI` | Arc-fault at panel |
| `Dual` | Combined AFCI/GFCI |

### Circuit Types

| Value | Meaning |
|-------|---------|
| `General` | Standard branch circuit |
| `Dedicated` | Single appliance (fridge, microwave) |
| `MWBC` | Multi-wire branch circuit (shared neutral) |
| `Spare` | Breaker installed but not wired |

### Room Codes

| Code | Room |
|------|------|
| KIT | Kitchen |
| LIV | Living Room |
| DIN | Dining Room |
| MBR | Master Bedroom |
| MBA | Master Bath |
| BR2, BR3 | Bedroom 2, 3 |
| BA2 | Bathroom 2 |
| GAR | Garage |
| BSM | Basement |
| ATT | Attic |
| LAU | Laundry |
| EXT | Exterior |
| HAL | Hallway |
| OFC | Office |

## Device (Optional)

Individual device tracking, if circuit-level isn't granular enough.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Device ID (e.g., "28-M-12-D1") |
| `circuit_id` | string | Yes | Parent circuit ID |
| `location` | string | Yes | Specific location (e.g., "North wall, left of sink") |
| `type` | string | Yes | Device type (outlet, switch, fixture) |
| `nfc_tag` | boolean | No | NFC tag installed |
| `notes` | string | No | Additional notes |

## Maintenance Record

Log of work performed.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `date` | date | Yes | Date of work |
| `circuit_id` | string | No | Affected circuit (or null for panel-level) |
| `work` | string | Yes | Description of work |
| `performed_by` | string | No | Who did the work |
| `cost` | number | No | Cost if applicable |
| `notes` | string | No | Additional notes |
