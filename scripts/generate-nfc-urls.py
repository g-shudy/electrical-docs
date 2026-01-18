#!/usr/bin/env python3
"""
Generate NFC tag URLs for all circuits in the electrical documentation.

Usage:
    python generate-nfc-urls.py [--format github|ghsj] [--property 28]

Output formats:
    github: https://g-shudy.github.io/electrical-docs/app/lookup.html?c=28-M-12
    ghsj:   https://ghsj.me/u?u=28-M-12+Kitchen+Counter+East+GFCI+20A
"""

import json
import argparse
import urllib.parse
from pathlib import Path

# Configuration
GITHUB_USERNAME = "g-shudy"
REPO_NAME = "electrical-docs"
GITHUB_BASE = f"https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/app/lookup.html"
GHSJ_BASE = "https://ghsj.me/u"


def load_property(data_dir: Path, property_code: str) -> dict:
    """Load a property's JSON data."""
    path = data_dir / f"{property_code}.json"
    if not path.exists():
        return None
    with open(path) as f:
        return json.load(f)


def generate_github_url(circuit_id: str) -> str:
    """Generate GitHub Pages lookup URL."""
    return f"{GITHUB_BASE}?c={circuit_id}"


def generate_ghsj_url(circuit: dict) -> str:
    """Generate ghsj.me URL with circuit details."""
    # Build display text
    lines = [
        circuit['id'],
        circuit['description'],
    ]

    # Add details
    details = []
    if circuit.get('protection') and circuit['protection'] != 'None':
        details.append(circuit['protection'])
    details.append(f"{circuit['amps']}A")
    if circuit.get('wire'):
        details.append(circuit['wire'])
    if details:
        lines.append(' | '.join(details))

    if circuit.get('notes'):
        lines.append(circuit['notes'])

    text = '\n'.join(lines)
    encoded = urllib.parse.quote(text, safe='')
    return f"{GHSJ_BASE}?u={encoded}"


def main():
    parser = argparse.ArgumentParser(description='Generate NFC tag URLs')
    parser.add_argument('--format', choices=['github', 'ghsj'], default='github',
                        help='URL format (default: github)')
    parser.add_argument('--property', '-p', type=str,
                        help='Specific property code (default: all)')
    parser.add_argument('--output', '-o', type=str,
                        help='Output file (default: stdout)')
    args = parser.parse_args()

    # Find data directory
    script_dir = Path(__file__).parent
    data_dir = script_dir.parent / 'data'

    # Get properties to process
    if args.property:
        codes = [args.property]
    else:
        codes = ['28', '14', '17']

    results = []

    for code in codes:
        property_data = load_property(data_dir, code)
        if not property_data:
            print(f"Warning: Property {code} not found")
            continue

        for panel in property_data.get('panels', []):
            for circuit in panel.get('circuits', []):
                if args.format == 'github':
                    url = generate_github_url(circuit['id'])
                else:
                    url = generate_ghsj_url(circuit)

                results.append({
                    'circuit_id': circuit['id'],
                    'description': circuit['description'],
                    'url': url
                })

    # Output
    output_lines = []
    output_lines.append("Circuit ID\tDescription\tNFC URL")
    output_lines.append("-" * 80)

    for r in results:
        output_lines.append(f"{r['circuit_id']}\t{r['description']}\t{r['url']}")

    output_text = '\n'.join(output_lines)

    if args.output:
        with open(args.output, 'w') as f:
            f.write(output_text)
        print(f"Written to {args.output}")
    else:
        print(output_text)

    print(f"\nTotal: {len(results)} circuits")


if __name__ == '__main__':
    main()
