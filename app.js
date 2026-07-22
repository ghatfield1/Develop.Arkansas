const properties = [
  {
    id: "DA-1001",
    address: "1200 River Market Avenue",
    city: "Little Rock",
    county: "Pulaski County",
    owner: "Arkansas Urban Holdings LLC",
    acres: "1.84 acres",
    zoning: "UU — Urban Use",
    futureLandUse: "Mixed Use",
    floodRisk: "Moderate",
    water: "Available nearby",
    sewer: "Available nearby",
    score: 86,
    coordinates: [-92.2664, 34.7486],
    polygon: [[
      [-92.26725,34.74905],[-92.26570,34.74903],[-92.26565,34.74820],
      [-92.26720,34.74818],[-92.26725,34.74905]
    ]],
    notes: [
      "Downtown location with strong access to employment, entertainment, and transit.",
      "Potential environmental and floodplain review should occur before acquisition.",
      "Existing street network supports a compact mixed-use concept."
    ],
    uses: ["Mixed use", "Apartments", "Neighborhood retail"]
  },
  {
    id: "DA-1002",
    address: "4700 University Avenue",
    city: "Little Rock",
    county: "Pulaski County",
    owner: "Central Arkansas Property Group",
    acres: "3.12 acres",
    zoning: "C-3 — General Commercial",
    futureLandUse: "Commercial",
    floodRisk: "Low",
    water: "Available",
    sewer: "Available",
    score: 78,
    coordinates: [-92.3406, 34.7087],
    polygon: [[
      [-92.34155,34.70930],[-92.33970,34.70926],[-92.33965,34.70810],
      [-92.34148,34.70806],[-92.34155,34.70930]
    ]],
    notes: [
      "Large commercial frontage and visibility.",
      "Access management and traffic circulation would be major site-plan considerations.",
      "Site may support phased redevelopment."
    ],
    uses: ["Retail", "Medical office", "Multifamily"]
  },
  {
    id: "DA-1003",
    address: "900 Central Avenue",
    city: "Hot Springs",
    county: "Garland County",
    owner: "Spa City Redevelopment Partners",
    acres: "0.92 acres",
    zoning: "C-1 — Central Business",
    futureLandUse: "Downtown Mixed Use",
    floodRisk: "Low",
    water: "Available",
    sewer: "Available",
    score: 89,
    coordinates: [-93.0547, 34.5034],
    polygon: [[
      [-93.05535,34.50385],[-93.05405,34.50383],[-93.05402,34.50298],
      [-93.05531,34.50299],[-93.05535,34.50385]
    ]],
    notes: [
      "Walkable central location near tourism and historic assets.",
      "Historic design review may affect demolition, materials, and massing.",
      "Strong potential for a small infill project."
    ],
    uses: ["Boutique hotel", "Residential over retail", "Restaurant"]
  },
  {
    id: "DA-1004",
    address: "2100 South Walton Boulevard",
    city: "Bentonville",
    county: "Benton County",
    owner: "Northwest Arkansas Growth Fund",
    acres: "4.25 acres",
    zoning: "C-2 — General Commercial",
    futureLandUse: "Regional Mixed Use",
    floodRisk: "Low",
    water: "Available",
    sewer: "Capacity unverified",
    score: 82,
    coordinates: [-94.2107, 36.3493],
    polygon: [[
      [-94.21185,36.35005],[-94.20955,36.35000],[-94.20950,36.34855],
      [-94.21180,36.34850],[-94.21185,36.35005]
    ]],
    notes: [
      "Located in a high-growth market with strong regional access.",
      "Utility capacity and driveway access require verification.",
      "Site scale supports multiple development configurations."
    ],
    uses: ["Office", "Multifamily", "Commercial"]
  }
];

const parcelsGeoJSON = {
  type: "FeatureCollection",
  features: properties.map(p => ({
    type: "Feature",
    properties: { id: p.id, address: p.address, score: p.score },
    geometry: { type: "Polygon", coordinates: p.polygon }
  }))
};

const opportunityGeoJSON = {
  type: "FeatureCollection",
  features: [{
    type: "Feature",
    properties: { name: "Illustrative growth area" },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-92.42,34.83],[-92.18,34.83],[-92.18,34.65],[-92.42,34.65],[-92.42,34.83]
      ]]
    }
  }]
};

const floodGeoJSON = {
  type: "FeatureCollection",
  features: [{
    type: "Feature",
    properties: { name: "Illustrative flood-risk area" },
    geometry: {
      type: "Polygon",
      coordinates: [[
        [-92.31,34.79],[-92.22,34.79],[-92.22,34.72],[-92.31,34.72],[-92.31,34.79]
      ]]
    }
  }]
};

const map = new maplibregl.Map({
  container: "map",
  style: "https://tiles.openfreemap.org/styles/liberty",
  center: [-92.45, 34.82],
  zoom: 6.7,
  attributionControl: true
});

map.addControl(new maplibregl.NavigationControl(), "bottom-right");
map.addControl(new maplibregl.ScaleControl({ unit: "imperial" }));

map.on("load", () => {
  map.addSource("parcels", { type: "geojson", data: parcelsGeoJSON });
  map.addLayer({
    id: "parcel-fill",
    type: "fill",
    source: "parcels",
    paint: {
      "fill-color": [
        "interpolate", ["linear"], ["get", "score"],
        70, "#d49a4a",
        90, "#1f6545"
      ],
      "fill-opacity": 0.48
    }
  });
  map.addLayer({
    id: "parcel-outline",
    type: "line",
    source: "parcels",
    paint: { "line-color": "#163f2d", "line-width": 2 }
  });

  map.addSource("flood", { type: "geojson", data: floodGeoJSON });
  map.addLayer({
    id: "flood-fill",
    type: "fill",
    source: "flood",
    layout: { visibility: "none" },
    paint: { "fill-color": "#3d74a7", "fill-opacity": 0.22 }
  });

  map.addSource("opportunity", { type: "geojson", data: opportunityGeoJSON });
  map.addLayer({
    id: "opportunity-fill",
    type: "fill",
    source: "opportunity",
    layout: { visibility: "none" },
    paint: { "fill-color": "#8b5fa6", "fill-opacity": 0.18 }
  });
  map.addLayer({
    id: "opportunity-outline",
    type: "line",
    source: "opportunity",
    layout: { visibility: "none" },
    paint: { "line-color": "#6b3f87", "line-width": 2, "line-dasharray": [2,2] }
  });

  map.on("click", "parcel-fill", e => {
    const id = e.features[0].properties.id;
    const property = properties.find(p => p.id === id);
    showProperty(property);
  });
  map.on("mouseenter", "parcel-fill", () => map.getCanvas().style.cursor = "pointer");
  map.on("mouseleave", "parcel-fill", () => map.getCanvas().style.cursor = "");
});

function showProperty(property) {
  document.getElementById("emptyState").hidden = true;
  document.getElementById("propertyContent").hidden = false;
  document.getElementById("propertyPanel").classList.add("open");

  const fields = {
    propertyAddress: property.address,
    propertyLocation: `${property.city}, Arkansas · ${property.county}`,
    propertyScore: `${property.score}/100`,
    parcelId: property.id,
    owner: property.owner,
    siteArea: property.acres,
    zoning: property.zoning,
    futureLandUse: property.futureLandUse,
    floodRisk: property.floodRisk,
    water: property.water,
    sewer: property.sewer
  };
  Object.entries(fields).forEach(([id, value]) => document.getElementById(id).textContent = value);
  document.getElementById("scoreBar").style.width = `${property.score}%`;

  const notes = document.getElementById("notes");
  notes.innerHTML = "";
  property.notes.forEach(note => {
    const li = document.createElement("li");
    li.textContent = note;
    notes.appendChild(li);
  });

  const uses = document.getElementById("uses");
  uses.innerHTML = "";
  property.uses.forEach(use => {
    const span = document.createElement("span");
    span.className = "chip";
    span.textContent = use;
    uses.appendChild(span);
  });

  document.getElementById("saveButton").dataset.propertyId = property.id;
  document.getElementById("copyButton").dataset.propertyId = property.id;

  map.flyTo({ center: property.coordinates, zoom: 15.5, essential: true });
}

function runSearch() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const results = document.getElementById("searchResults");
  results.innerHTML = "";

  if (!query) {
    results.textContent = "Enter a search term.";
    return;
  }

  const matches = properties.filter(p =>
    [p.id, p.address, p.city, p.county, p.owner].some(v => v.toLowerCase().includes(query))
  );

  if (!matches.length) {
    results.textContent = "No demonstration properties matched.";
    return;
  }

  matches.forEach(property => {
    const button = document.createElement("button");
    button.className = "result-button";
    button.type = "button";
    button.innerHTML = `<strong>${property.address}</strong><small>${property.city} · ${property.id}</small>`;
    button.addEventListener("click", () => showProperty(property));
    results.appendChild(button);
  });
}

document.getElementById("searchButton").addEventListener("click", runSearch);
document.getElementById("searchInput").addEventListener("keydown", e => {
  if (e.key === "Enter") runSearch();
});

document.getElementById("parcelToggle").addEventListener("change", e => {
  const visibility = e.target.checked ? "visible" : "none";
  map.setLayoutProperty("parcel-fill", "visibility", visibility);
  map.setLayoutProperty("parcel-outline", "visibility", visibility);
});
document.getElementById("floodToggle").addEventListener("change", e => {
  map.setLayoutProperty("flood-fill", "visibility", e.target.checked ? "visible" : "none");
});
document.getElementById("opportunityToggle").addEventListener("change", e => {
  const visibility = e.target.checked ? "visible" : "none";
  map.setLayoutProperty("opportunity-fill", "visibility", visibility);
  map.setLayoutProperty("opportunity-outline", "visibility", visibility);
});

document.getElementById("closePanel").addEventListener("click", () => {
  document.getElementById("propertyPanel").classList.remove("open");
});

document.getElementById("saveButton").addEventListener("click", e => {
  const id = e.target.dataset.propertyId;
  const saved = JSON.parse(localStorage.getItem("developArkansasSaved") || "[]");
  if (!saved.includes(id)) saved.push(id);
  localStorage.setItem("developArkansasSaved", JSON.stringify(saved));
  e.target.textContent = "Saved";
});

document.getElementById("copyButton").addEventListener("click", async e => {
  const property = properties.find(p => p.id === e.target.dataset.propertyId);
  const summary = `${property.address}, ${property.city}, Arkansas
Parcel: ${property.id}
Owner: ${property.owner}
Area: ${property.acres}
Zoning: ${property.zoning}
Future land use: ${property.futureLandUse}
Demonstration score: ${property.score}/100`;
  try {
    await navigator.clipboard.writeText(summary);
    e.target.textContent = "Copied";
  } catch {
    alert(summary);
  }
});

const aboutDialog = document.getElementById("aboutDialog");
document.getElementById("aboutButton").addEventListener("click", () => aboutDialog.showModal());
document.getElementById("closeAbout").addEventListener("click", () => aboutDialog.close());
