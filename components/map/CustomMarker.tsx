'use client'

import maplibregl from 'maplibre-gl'
import { useEffect, useRef } from 'react'

interface CustomMarkerProps {
  map: maplibregl.Map
  position: [number, number]
  onClick: () => void
  isSelected?: boolean
}

export const CustomMarker = ({
  map,
  position,
  onClick,
  isSelected,
}: CustomMarkerProps) => {
  const markerRef = useRef<maplibregl.Marker | null>(null)

  useEffect(() => {
    if (!map) return

    // Create marker
    const marker = new maplibregl.Marker({
      color: isSelected ? '#059669' : '#2563eb', // green-600 when selected, blue-600 default
      scale: isSelected ? 1 : 0.8,
    })
      .setLngLat(position)
      .addTo(map)

    // Add click handler
    marker.getElement().addEventListener('click', onClick)

    // Store marker reference
    markerRef.current = marker

    // Cleanup
    return () => {
      marker.remove()
    }
  }, [map, position, onClick, isSelected])

  return null
}
