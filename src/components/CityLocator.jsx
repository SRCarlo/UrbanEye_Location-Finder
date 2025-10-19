// src/components/CityLocator.jsx
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import { FaSearch, FaSatellite, FaRoad, FaTimes } from "react-icons/fa";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const MapZoomToCity = ({ city }) => {
  const map = useMap();
  useEffect(() => {
    if (city) {
      map.setView([city.latitude, city.longitude], 11, { animate: true });
    }
  }, [city, map]);
  return null;
};

const CityLocator = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [satelliteView, setSatelliteView] = useState(false);

  const searchCity = async () => {
    if (!query.trim()) {
      setError("Please enter a city name.");
      setResults([]);
      setSelectedCity(null);
      return;
    }
    setLoading(true);
    setError("");
    setResults([]);
    setSelectedCity(null);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=20`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setResults(data.results);
      } else {
        setError("No cities found.");
      }
    } catch (err) {
      setError("Failed to fetch: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (!(num || num === 0)) return "N/A";
    return num.toLocaleString();
  };

  const closeInfo = () => {
    setSelectedCity(null);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-title">UrbanEye</div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchCity()}
            aria-label="Search city"
          />
          <button
            onClick={searchCity}
            disabled={loading}
            aria-label="Search"
            title="Search"
          >
            <FaSearch />
          </button>
        </div>
      </nav>

      <main className="main-content" role="main">
        <aside className="results-panel" aria-label="Search results">
          {loading && <p className="status">Loading...</p>}
          {error && <p className="status error">{error}</p>}
          {!loading && results.length > 0 && (
            <ul className="results-list">
              {results.map((city, idx) => (
                <li
                  key={`${city.id}-${idx}`}
                  className={`city-card ${
                    selectedCity && selectedCity.id === city.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedCity(city);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedCity(city);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selectedCity && selectedCity.id === city.id}
                >
                  <div className="city-name">
                    {city.name}, {city.country}
                  </div>
                  <div className="city-region">
                    Region: {city.admin1 || "N/A"} <br />
                    Subregion: {city.admin2 || "N/A"}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <section className="map-panel" aria-label="Map with city location">
          <div className="map-controls" aria-label="Map view controls">
            <button
              onClick={() => setSatelliteView(false)}
              className={!satelliteView ? "active" : ""}
              aria-pressed={!satelliteView}
              title="Street View"
            >
              <FaRoad aria-hidden="true" /> Street
            </button>
            <button
              onClick={() => setSatelliteView(true)}
              className={satelliteView ? "active" : ""}
              aria-pressed={satelliteView}
              title="Satellite View"
            >
              <FaSatellite aria-hidden="true" /> Satellite
            </button>
          </div>

          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
            aria-label="City map"
          >
            {!satelliteView ? (
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
            ) : (
              <>
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution="Tiles &copy; Esri"
                />
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                  attribution="Labels &copy; Esri"
                  pane="overlayPane"
                />
              </>
            )}

            {selectedCity && <MapZoomToCity city={selectedCity} />}
            {selectedCity && (
              <Marker
                position={[selectedCity.latitude, selectedCity.longitude]}
              >
                <Popup>
                  {selectedCity.name}, {selectedCity.country}
                  <br />
                  Population: {formatNumber(selectedCity.population)}
                </Popup>
              </Marker>
            )}
            <ZoomControl position="bottomright" />
          </MapContainer>

          {selectedCity && (
            <div className="info-card" aria-live="polite" aria-atomic="true">
              <button
                onClick={closeInfo}
                aria-label="Close city info"
                className="close-info-btn"
              >
                <FaTimes />
              </button>
              <h2>
                {selectedCity.name}, {selectedCity.country}
              </h2>
              <div className="info-row">
                <div className="label">Region</div>
                <div className="value">{selectedCity.admin1 || "N/A"}</div>
              </div>
              <div className="info-row">
                <div className="label">Subregion</div>
                <div className="value">{selectedCity.admin2 || "N/A"}</div>
              </div>
              <div className="info-row">
                <div className="label">Coordinates</div>
                <div className="value">
                  {selectedCity.latitude.toFixed(4)},{" "}
                  {selectedCity.longitude.toFixed(4)}
                </div>
              </div>
              <div className="info-row">
                <div className="label">Population</div>
                <div className="value">
                  {formatNumber(selectedCity.population)}
                </div>
              </div>
              <div className="info-row">
                <div className="label">Timezone</div>
                <div className="value">{selectedCity.timezone || "N/A"}</div>
              </div>
              <div className="info-row">
                <div className="label">Elevation</div>
                <div className="value">
                  {selectedCity.elevation !== undefined
                    ? `${selectedCity.elevation} m`
                    : "N/A"}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');

        body, html, #root {
          margin: 0;
          height: 100%;
          font-family: 'Audiowide', cursive, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f7f9fc;
          color: #222;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          height: 56px;
          border-bottom: 1px solid #ccc;
          flex-shrink: 0;
          background: #fff;
          font-weight: 700;
          color: #0077cc;
        }
        .navbar-title {
          font-weight: bold;
          font-size: 1.4rem;
          color: #0e0e0eff;
          font-family: 'Audiowide', cursive;
        }
        .search-container {
          position: relative;
          width: 220px;
        }
        .search-container input {
          width: 70%;
          padding: 8px 36px 8px 12px;
          border: 1px solid #333334ff;
          border-radius: 30px;
          background: transparent;
          color: #5b6871ff;
          font-size: 1rem;
          outline: none;
          font-family: inherit;
        }
        .search-container button {
          position: absolute;
          right: 24px;
          top: 60%;
          transform: translateY(-50%);
          border: none;
          background: none;
          color: #01101bff;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .main-content {
          flex: 1 1 auto;
          display: flex;
          gap: 20px;
          padding: 20px;
          height: calc(100vh - 56px - 44px); /* subtract navbar + footer heights */
          overflow: hidden;
        }

        .results-panel {
          flex-basis: 35%;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 12px;
          overflow-y: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none;  /* IE 10+ */
        }
        .results-panel::-webkit-scrollbar {
          width: 0px;
          background: transparent; /* Chrome/Safari/Webkit */
        }

        .status {
          text-align: center;
          margin: 20px 0;
        }
        .status.error {
          color: #d9534f;
        }

        .results-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .city-card {
          padding: 12px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
          user-select: none;
          font-family: inherit;
          transition: background-color 0.2s, border-color 0.2s;
        }
        .city-card.selected {
          background: #e0f3ff;
          border-color: #0c0c0cff;
        }
        .city-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2f2d2dff;
          font-family: 'Audiowide', cursive;
        }
        .city-region {
          font-size: 0.9rem;
          color: #3d3c3cff;
          white-space: pre-line;
        }

        .map-panel {
          flex-grow: 1;
          position: relative;
          border: 1px solid #ddd;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .map-controls {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1000;
          display: flex;
          gap: 6px;
        }
        .map-controls button {
          padding: 6px 10px;
          border: 1px solid #e4e9ecff;
          background: #fff;
          color: #5b5c5cff;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Audiowide', cursive;
          border-radius: 4px;
          transition: background-color 0.2s, color 0.2s;
        }
        .map-controls button.active {
          background: #455565ff;
          color: #fff;
        }
        .map-controls button:hover:not(.active) {
          background: #e6f0ff;
        }

        .info-card {
          position: absolute;
          top: 20px;
          left: 20px;
          max-width: 320px;
          padding: 16px 36px 16px 16px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 10px;
          z-index: 1000;
          font-family: inherit;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .info-card h2 {
          margin-top: 0;
          margin-bottom: 12px;
          color: #24323cff;
          font-size: 1.4rem;
          font-family: 'Audiowide', cursive;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .label {
          font-weight: 500;
          color: #121212ff;
        }
        .value {
          font-weight: 600;
          color: #39393aff;
        }
        .close-info-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          color: #000000ff;
          font-size: 1.2rem;
          cursor: pointer;
        }
        .close-info-btn:hover {
          color: #fb0026ff;
        }

        footer {
          font-family: 'Audiowide', cursive;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .main-content {
            flex-direction: column;
            height: auto;
            padding: 10px;
          }
          .results-panel {
            flex-basis: auto;
            height: 220px;
            margin-bottom: 12px;
            border-radius: 8px;
          }
          .map-panel {
            height: 400px;
            border-radius: 8px;
          }
          .info-card {
            position: static;
            max-width: 100%;
            margin-top: 12px;
            box-shadow: none;
          }
          .map-controls {
            top: auto;
            bottom: 10px;
            right: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default CityLocator;
