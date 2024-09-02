"use client";

import React from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { CircleMarker, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  latLng: LatLngExpression;
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, latLng }) => {
  if (!isOpen) return null;

  const radius = 1000;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Add backdrop overlay
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full m-2">
        <div className="flex flex-col gap-0  md:flex-row md:justify-between">
          <h2 className="text-2xl text-black font-semibold mb-2">
            Localização do Imóvel
          </h2>{" "}
          <p className="text-gray-600 mb-1">São Paulo, Sé</p>
        </div>
        <MapContainer
          center={latLng}
          zoom={14}
          style={{ height: "400px", width: "100%" }}
          scrollWheelZoom={false}
          dragging={false}
          touchZoom={false}
          doubleClickZoom={false}
          boxZoom={false}
          keyboard={false}
          tap={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Circle center={latLng} radius={radius} />
        </MapContainer>
        <button
          onClick={onClose}
          className="bg-[#17A1FA] hover:bg-blue-400 hover:shadow-md  text-white font-bold py-2 px-4 rounded mt-4"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default MapModal;
