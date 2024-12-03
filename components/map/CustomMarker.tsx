'use client'

import maplibregl from 'maplibre-gl'
import { useEffect, useRef } from 'react'

interface CustomMarkerProps {
  map: maplibregl.Map
  position: [number, number]
  onClick: () => void
}

export const CustomMarker = ({ map, position, onClick }: CustomMarkerProps) => {
  const markerRef = useRef<maplibregl.Marker | null>(null)

  useEffect(() => {
    if (!map) return

    // Create marker
    const marker = new maplibregl.Marker({
      color: '#2563eb', // blue-600
      scale: 0.8,
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
  }, [map, position, onClick])

  return null
}
