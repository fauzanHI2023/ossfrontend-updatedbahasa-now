// components/MapWithSearch.tsx
'use client';
import {useLoadScript, GoogleMap, Marker} from '@react-google-maps/api';
import React, {useRef, useState} from 'react';

const libraries: 'places'[] = ['places'];

const mapContainerStyle = {
  width: '100%',
  height: '450px'
};

const center = {lat: -6.2, lng: 106.816666};

export type PlaceResult = {
  lat: number;
  lng: number;
  name?: string;
  address?: string;
};

export default function MapWithSearch({
  onSelect
}: {
  onSelect?: (place: PlaceResult) => void;
}) {
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries
  });

  const [selected, setSelected] = useState<PlaceResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current!);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.name || place.formatted_address;
        // const address = place.formatted_address || '';

        const placeData: PlaceResult = {lat, lng, address};

        setSelected(placeData);
        map.panTo({lat, lng});

        if (onSelect) onSelect(placeData); // <== Kirim data ke luar
      }
    });
  };

  if (loadError) return <p>Map error</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        placeholder="Cari Lokasi Pertemuan......"
        className="w-full p-2 border rounded"
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selected || center}
        zoom={14}
        onLoad={onMapLoad}
      >
        {selected && (
          <Marker position={{lat: selected.lat, lng: selected.lng}} />
        )}
      </GoogleMap>

      {selected && (
        <div className="mt-2 text-sm text-gray-700">
          <p>
            <strong>Alamat:</strong> {selected.address || '-'}
          </p>
        </div>
      )}
    </div>
  );
}
