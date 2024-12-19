import {
  maptilerApiKey,
  maptilerHeroStyleKey,
  maptilerHeroStyleKeyDark,
} from '@/config'
import maplibregl from 'maplibre-gl'
import { useEffect, useRef, useState } from 'react'

const lng = 10.522
const lat = 52.264
const zoom = 13
const getMapStyle = (isDark: boolean) => {
  const styleKey = isDark ? maptilerHeroStyleKeyDark : maptilerHeroStyleKey
  return `https://api.maptiler.com/maps/${styleKey}/style.json?key=${maptilerApiKey}`
}

export function useMap(mapOptions?: {
  draggable?: boolean
  scrollZoom?: boolean
  keyboard?: boolean
}) {
  const [map, setMap] = useState<maplibregl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapContainerRef.current || map !== null) {
      return
    }

    // Check both system preference and class for initial dark mode state
    const systemDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
    const htmlDarkMode = document.documentElement.classList.contains('dark')
    const isDark = systemDarkMode || htmlDarkMode

    const instance = new maplibregl.Map({
      container: mapContainerRef.current,
      style: getMapStyle(isDark),
      center: [lng, lat],
      zoom: zoom,
    })

    // Ensure dark mode class is set if system prefers dark
    if (systemDarkMode && !htmlDarkMode) {
      document.documentElement.classList.add('dark')
    }

    let observer: MutationObserver | null = null

    const updateMapStyle = (isDark: boolean) => {
      // Store current state
      const center = instance.getCenter()
      const zoom = instance.getZoom()
      const bearing = instance.getBearing()
      const pitch = instance.getPitch()

      const newStyle = getMapStyle(isDark)
      try {
        instance.setStyle(newStyle)

        // Restore state after style loads
        instance.once('style.load', () => {
          instance.setCenter(center)
          instance.setZoom(zoom)
          instance.setBearing(bearing)
          instance.setPitch(pitch)
        })
      } catch (error) {
        console.error('Error updating map style:', error)
      }
    }

    // Set up observer after initial style load
    instance.once('style.load', () => {
      observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const isDark = document.documentElement.classList.contains('dark')
            updateMapStyle(isDark)
          }
        })
      })

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })
    })

    if (mapOptions?.draggable === false) {
      instance.dragPan.disable()
    }
    if (mapOptions?.scrollZoom === false) {
      instance.scrollZoom.disable()
    }
    if (mapOptions?.keyboard === false) {
      instance.keyboard.disable()
    }

    setMap(instance)

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [mapOptions, map])

  return { mapContainerRef, map }
}
