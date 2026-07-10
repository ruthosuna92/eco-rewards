"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useUserLocation } from "@/hooks/useUserLocation";
import { BOGOTA_FALLBACK_CENTER } from "@/lib/geolocation";
import type { DropOffPoint } from "@/types/dropoffPoint";
import { CentreCard } from "./CentreCard";

type CentresMapProps = {
  centres: DropOffPoint[];
};

const centreIcon = L.divIcon({
  className: "",
  html: `<div style="
    width: 22px;
    height: 22px;
    border-radius: 50% 50% 50% 0;
    background: rgb(22 101 52);
    border: 2px solid rgb(34 197 94);
    box-shadow: 0 2px 6px rgba(22, 101, 52, 0.35);
    transform: rotate(-45deg);
  "></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 22],
  popupAnchor: [0, -24],
});

export function CentresMap({ centres }: CentresMapProps) {
  const { location } = useUserLocation();
  const center = location ?? BOGOTA_FALLBACK_CENTER;

  return (
    <div className="h-96 w-full rounded-3xl overflow-hidden border border-border mb-8">
      <MapContainer center={[center.lat, center.lng]} zoom={12} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {centres.map((centre) => (
          <Marker key={centre.id} position={[centre.lat, centre.lng]} icon={centreIcon}>
            <Popup>
              <div className="w-64 flex flex-col gap-3">
                <CentreCard centre={centre} />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
