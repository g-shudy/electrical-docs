// Electrical Documentation App

const DATA_PATH = '../data';

// Load property data
async function loadProperty(propertyCode) {
  try {
    const response = await fetch(`${DATA_PATH}/${propertyCode}.json`);
    if (!response.ok) throw new Error(`Property ${propertyCode} not found`);
    return await response.json();
  } catch (error) {
    console.error('Error loading property:', error);
    return null;
  }
}

// Load all properties
async function loadAllProperties() {
  const codes = ['28', '14', '17'];
  const properties = {};

  for (const code of codes) {
    properties[code] = await loadProperty(code);
  }

  return properties;
}

// Find circuit by ID (e.g., "28-M-12")
async function findCircuit(circuitId) {
  const parts = circuitId.split('-');
  if (parts.length < 3) return null;

  const propertyCode = parts[0];
  const panelId = parts[1];
  const breakerNum = parseInt(parts[2]);

  const property = await loadProperty(propertyCode);
  if (!property) return null;

  const panel = property.panels.find(p => p.id === panelId);
  if (!panel) return null;

  const circuit = panel.circuits.find(c => c.breaker === breakerNum);
  if (!circuit) return null;

  return {
    property,
    panel,
    circuit
  };
}

// Search circuits across all properties
async function searchCircuits(query) {
  const properties = await loadAllProperties();
  const results = [];
  const queryLower = query.toLowerCase();

  for (const [code, property] of Object.entries(properties)) {
    if (!property || !property.panels) continue;

    for (const panel of property.panels) {
      for (const circuit of panel.circuits) {
        const searchText = [
          circuit.id,
          circuit.description,
          circuit.rooms?.join(' '),
          circuit.notes
        ].join(' ').toLowerCase();

        if (searchText.includes(queryLower)) {
          results.push({ property, panel, circuit });
        }
      }
    }
  }

  return results;
}

// Render a circuit card
function renderCircuitCard(circuit, panel, property) {
  const isGFCI = circuit.protection?.includes('GFCI');
  const isCritical = circuit.critical;

  let cardClass = 'circuit-card';
  if (isCritical) cardClass += ' critical';
  else if (isGFCI) cardClass += ' gfci';

  const slotInfo = circuit.slots || circuit.breaker;

  return `
    <div class="${cardClass}">
      <div class="circuit-id">${circuit.id}</div>
      <div class="circuit-description">${circuit.description}</div>
      <div class="circuit-meta">
        <span class="tag amps">${circuit.amps}A</span>
        <span class="tag slot">Slot ${slotInfo}</span>
        ${circuit.poles > 1 ? `<span class="tag">240V</span>` : ''}
        ${circuit.wire ? `<span class="tag wire">${circuit.wire}</span>` : ''}
        ${circuit.protection && circuit.protection !== 'None' ? `<span class="tag protection">${circuit.protection}</span>` : ''}
        ${isCritical ? `<span class="tag critical">CRITICAL</span>` : ''}
        ${circuit.rooms?.map(r => `<span class="tag room">${r}</span>`).join('') || ''}
      </div>
      ${circuit.breaker_model ? `<div class="circuit-breaker-model">Breaker: ${circuit.breaker_model}</div>` : ''}
      ${circuit.notes ? `<div class="circuit-notes">${circuit.notes}</div>` : ''}
    </div>
  `;
}

// Render panel info bar
function renderPanelInfo(panel, property) {
  let html = `
    <div class="panel-info">
      <strong>Panel:</strong> ${panel.name} (${panel.id}) &bull;
      <strong>Location:</strong> ${panel.location} &bull;
      <strong>Property:</strong> ${property.property}
  `;

  if (panel.manufacturer || panel.model) {
    html += ` &bull; <strong>Model:</strong> `;
    if (panel.manufacturer) html += panel.manufacturer;
    if (panel.model) html += ` ${panel.model}`;
  }

  html += `</div>`;
  return html;
}

// Get URL parameter
function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Room code lookup
const ROOM_CODES = {
  KIT: 'Kitchen',
  LIV: 'Living Room',
  DIN: 'Dining Room',
  MBR: 'Master Bedroom',
  MBA: 'Master Bath',
  BR2: 'Bedroom 2',
  BR3: 'Bedroom 3',
  BA2: 'Bathroom 2',
  GAR: 'Garage',
  BSM: 'Basement',
  ATT: 'Attic',
  LAU: 'Laundry',
  EXT: 'Exterior',
  HAL: 'Hallway',
  OFC: 'Office'
};
