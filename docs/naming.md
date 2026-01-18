# Naming Conventions

## Circuit ID Format

```
[Property]-[Panel]-[Breaker]
```

### Examples

| Circuit ID | Meaning |
|------------|---------|
| `28-M-12` | Property 28, Main Panel, Breaker 12 |
| `14-S1-4` | Property 14, Sub-panel 1, Breaker 4 |
| `17-G-8` | Property 17, Garage Panel, Breaker 8 |

## Property Codes

Anonymous codes derived from street numbers:

| Code | Property |
|------|----------|
| 28 | First property |
| 14 | Second property |
| 17 | Third property |

## Panel Codes

| Code | Meaning | Typical Location |
|------|---------|------------------|
| M | Main Panel | Garage, basement, utility room |
| S1, S2 | Sub-panel 1, 2 | Basement, addition |
| G | Garage Panel | Garage |
| E | Emergency Panel | Near transfer switch |
| P | Pool/Spa Panel | Near pool equipment |

## Device IDs (Optional)

For per-outlet tracking:

```
[Circuit ID]-D[Number]
```

Example: `28-M-12-D1` = First device on circuit 28-M-12

## NFC Tag URLs

Tags link to the lookup page with circuit ID:

```
https://[username].github.io/electrical-docs/app/lookup.html?c=28-M-12
```

## Physical Labels

### On Cover Plates (back, permanent marker)

```
28-M-12
```

### On Panel Schedule

```
12 | 20A | Kitchen Counter East (GFCI)
```

## Room Codes

Use these in the `rooms` field:

| Code | Room | Code | Room |
|------|------|------|------|
| KIT | Kitchen | GAR | Garage |
| LIV | Living Room | BSM | Basement |
| DIN | Dining Room | ATT | Attic |
| MBR | Master Bedroom | LAU | Laundry |
| MBA | Master Bath | EXT | Exterior |
| BR2 | Bedroom 2 | HAL | Hallway |
| BR3 | Bedroom 3 | OFC | Office |
| BA2 | Bathroom 2 | MEC | Mechanical |
