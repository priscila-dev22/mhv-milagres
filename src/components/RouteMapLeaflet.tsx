import L from "leaflet";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { MapLocation, MapLocationCategory } from "../data/routeMapPlaces";
import {
  ROUTE_MAP_DEFAULT_CENTER,
  ROUTE_MAP_DEFAULT_ZOOM,
  mapLocationCategoryLabel,
  mapLocationHasMarker,
  mapLocationWhatsappHref,
  routeMapOpenMapsHref,
} from "../data/routeMapPlaces";

import "leaflet/dist/leaflet.css";

const FIT_PADDING: L.PointExpression = [52, 52];
const SINGLE_POINT_ZOOM = 13;

const popupLinkClass =
  "font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-petroleum underline-offset-[3px] hover:text-sepia hover:underline";

function markerIcon(category: MapLocationCategory, active: boolean) {
  return L.divIcon({
    className: "",
    html: `<span class="route-map-pin route-map-pin--${category}${active ? " route-map-pin--active" : ""}" aria-hidden="true"></span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -14],
  });
}

type MapViewportProps = {
  markerPlaces: MapLocation[];
  focusPlace: MapLocation | null;
  fitKey: string;
};

function MapViewport({ markerPlaces, focusPlace, fitKey }: MapViewportProps) {
  const map = useMap();

  useEffect(() => {
    if (focusPlace) return;

    if (markerPlaces.length === 0) {
      map.setView(ROUTE_MAP_DEFAULT_CENTER, ROUTE_MAP_DEFAULT_ZOOM);
      return;
    }

    if (markerPlaces.length === 1) {
      const p = markerPlaces[0]!;
      map.setView([p.latitude!, p.longitude!], SINGLE_POINT_ZOOM);
      return;
    }

    const bounds = L.latLngBounds(
      markerPlaces.map((p) => [p.latitude!, p.longitude!] as L.LatLngExpression),
    );
    map.fitBounds(bounds, {
      padding: FIT_PADDING,
      maxZoom: 13,
      animate: true,
    });
  }, [fitKey, focusPlace, map, markerPlaces]);

  useEffect(() => {
    if (!focusPlace || !mapLocationHasMarker(focusPlace)) return;
    map.flyTo(
      [focusPlace.latitude!, focusPlace.longitude!],
      Math.max(map.getZoom(), SINGLE_POINT_ZOOM),
      { animate: true, duration: 0.65 },
    );
  }, [focusPlace, map]);

  return null;
}

type PlacePopupProps = {
  place: MapLocation;
};

function PlacePopupContent({ place }: PlacePopupProps) {
  const whatsappHref = mapLocationWhatsappHref(place.whatsapp);
  const mapsHref = routeMapOpenMapsHref(place);

  return (
    <div className="route-map-popup min-w-[11rem] max-w-[16rem]">
      <p className="font-sans text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-sepia/90">
        {mapLocationCategoryLabel(place.category)}
      </p>
      <p className="mt-1 font-serif text-base font-medium leading-snug text-petroleum">
        {place.name}
      </p>
      {place.description ? (
        <p className="mt-2 font-sans text-[0.8125rem] leading-relaxed text-stone-600">
          {place.description}
        </p>
      ) : null}
      <p className="mt-2 font-sans text-[0.8125rem] leading-relaxed text-stone-600">
        {place.address}
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {place.instagram ? (
          <li>
            <a
              href={place.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={popupLinkClass}
            >
              Instagram
            </a>
          </li>
        ) : null}
        {whatsappHref ? (
          <li>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={popupLinkClass}
            >
              WhatsApp
            </a>
          </li>
        ) : null}
        <li>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className={popupLinkClass}
          >
            Abrir no mapa
          </a>
        </li>
      </ul>
    </div>
  );
}

type RouteMapLeafletProps = {
  markerPlaces: MapLocation[];
  selectedPlace: MapLocation | null;
  fitKey: string;
  onSelectPlace: (id: string) => void;
  onClearSelection: () => void;
};

export function RouteMapLeaflet({
  markerPlaces,
  selectedPlace,
  fitKey,
  onSelectPlace,
  onClearSelection,
}: RouteMapLeafletProps) {
  const markerRefs = useRef<Record<string, L.Marker | null>>({});

  useEffect(() => {
    if (!selectedPlace?.id) return;
    const marker = markerRefs.current[selectedPlace.id];
    marker?.openPopup();
  }, [selectedPlace?.id]);

  const mapCenter = useMemo((): [number, number] => {
    if (markerPlaces.length === 1 && mapLocationHasMarker(markerPlaces[0]!)) {
      return [markerPlaces[0]!.latitude!, markerPlaces[0]!.longitude!];
    }
    return ROUTE_MAP_DEFAULT_CENTER;
  }, [markerPlaces]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={ROUTE_MAP_DEFAULT_ZOOM}
      className="route-map-leaflet h-full w-full"
      scrollWheelZoom
      attributionControl
      zoomControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapViewport
        markerPlaces={markerPlaces}
        focusPlace={selectedPlace}
        fitKey={fitKey}
      />
      {markerPlaces.map((place) => {
        if (!mapLocationHasMarker(place)) return null;
        const active = selectedPlace?.id === place.id;
        return (
          <Marker
            key={place.id}
            position={[place.latitude!, place.longitude!]}
            icon={markerIcon(place.category, active)}
            ref={(ref) => {
              markerRefs.current[place.id] = ref;
            }}
            eventHandlers={{
              click: () => onSelectPlace(place.id),
            }}
          >
            <Popup
              className="route-map-leaflet-popup"
              eventHandlers={{
                remove: onClearSelection,
              }}
            >
              <PlacePopupContent place={place} />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export function RouteMapMapShell({ children }: { children: ReactNode }) {
  return (
    <div className="route-map-frame relative h-[clamp(420px,52vh,520px)] w-full overflow-hidden rounded-sm border border-stone-200/50 bg-stone-200/25 lg:h-full lg:min-h-[620px] lg:max-h-[760px]">
      {children}
    </div>
  );
}
