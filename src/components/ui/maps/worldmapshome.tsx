'use client';

import {MapContainer, Marker, Popup, GeoJSON} from 'react-leaflet';
import L from 'leaflet';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, {useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

// Fix ikon marker (Next.js tidak load otomatis)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

// Center map di tengah dunia
const position: [number, number] = [20, 0];

// Tipe untuk fitur GeoJSON

const getCountryStyle = (feature?: GeoJSON.Feature): L.PathOptions => {
  //   console.log('feature:', feature?.properties);
  const iso = (feature?.properties as any)?.['ISO3166-1-Alpha-3']; // ✅ gunakan nama properti yang benar

  const colors: Record<string, string> = {
    IDN: '#075985',
    GBR: '#075985',
    DEU: '#075985',
    TUR: '#075985',
    USA: '#075985',
    KOR: '#075985',
    JPN: '#075985',
    AUS: '#075985'
  };

  return {
    fillColor: colors[iso ?? ''] || '#8fdcff',
    weight: 1,
    color: '#8fdcff',
    fillOpacity: 1
  };
};

export default function WorldMap() {
  const [geoData, setGeoData] = useState<GeoJSON.FeatureCollection | null>(
    null
  );

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
    )
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={2}
      style={{
        height: '700px',
        width: '100%',
        background: '#ffffff',
        borderRadius: '30px'
      }}
      scrollWheelZoom={false}
      attributionControl={false}
      worldCopyJump={false}
      maxBounds={[
        [-90, -180],
        [90, 180]
      ]} // batas dunia
      maxBoundsViscosity={1.0}
      className="z-0"
    >
      {/* GeoJSON negara-negara */}
      {geoData && <GeoJSON data={geoData} style={getCountryStyle} />}

      {/* Marker lokasi tertentu */}
      <Marker position={[-6.2, 106.8]}>
        <Popup>
          <div className="flex flex-col">
            <span>Human Initiative Headquarter</span>
            <Link href="https://human-initiative.org/">
              https://human-initiative.org/
            </Link>
          </div>
        </Popup>
      </Marker>
      <Marker position={[35.6, 139.7]}>
        <Popup>
          <div className="flex flex-col">
            <span>Human Initiative Jepang</span>
            <Link href="https://human-initiative.jp/">
              https://human-initiative.jp/
            </Link>
          </div>
        </Popup>
      </Marker>
      <Marker position={[35.5, 128.0]}>
        <Popup>
          <div className="flex flex-col">
            <span>Human Initiative Korea Selatan</span>
            <Link href="https://korea-humaninitiative.org/">
              https://korea-humaninitiative.org/
            </Link>
          </div>
        </Popup>
      </Marker>
      <Marker position={[-30.8, 142.2]}>
        <Popup>
          <div className="flex flex-col">
            <span>Human Initiative Australia</span>
            <Link href="http://www.humaninitiative.org.au/">
              http://www.humaninitiative.org.au/
            </Link>
          </div>
        </Popup>
      </Marker>
      <Marker position={[50.7, 9.4]}>
        <Popup>
          <div className="flex flex-col">
            <span>Human Initiative Europe</span>
            <Link href="https://human-initiative.eu/">
              https://human-initiative.eu/
            </Link>
          </div>
        </Popup>
      </Marker>
      <Marker position={[53.5, -2.1]}>
        <Popup>
          <div className="flex flex-col">
            <span>Human Initiative United Kingdom</span>
            <Link href="https://www.humanaidinitiative.org/">
              https://www.humanaidinitiative.org/
            </Link>
          </div>
        </Popup>
      </Marker>
      <Marker position={[37.2, 32.4]}>
        <Popup>
          <div className="flex flex-col">
            <span>Human Initiative Turkey</span>
            {/* <Link href="https://www.humanaidinitiative.org/">
              https://www.humanaidinitiative.org/
            </Link> */}
          </div>
        </Popup>
      </Marker>
      <Marker position={[38.0, -100.1]}>
        <Popup>
          <div className="flex flex-col">
            <span>Human Initiative United States America</span>
            {/* <Link href="https://www.humanaidinitiative.org/">
              https://www.humanaidinitiative.org/
            </Link> */}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
