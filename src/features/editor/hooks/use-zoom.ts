import { useEffect, useCallback, useRef } from 'react'
import { fabric } from 'fabric'
import { useZoomStore } from '../store/use-zoom-store'
import throttle from 'lodash/throttle'

interface UseZoomProps {
  canvas: fabric.Canvas | null
  container: HTMLDivElement | null
}

export const useZoom = ({ canvas }: UseZoomProps) => {
  const { zoomLevel, setZoomLevel } = useZoomStore()
  const zoomingRef = useRef(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateZoomLevel = useCallback(
    throttle(() => {
      if (!canvas) return

      const zoom = canvas.getZoom()
      const newZoomLevel = Math.round(zoom * 100)

      if (newZoomLevel !== zoomLevel) {
        setZoomLevel(newZoomLevel)
      }
    }, 16),
    [canvas, setZoomLevel, zoomLevel],
  )

  // Update zoom level when canvas zoom changes
  useEffect(() => {
    if (!canvas) return

    // Listen for zoom changes
    canvas.on('zoom:changed', updateZoomLevel)

    // Initial update
    updateZoomLevel()

    return () => {
      canvas.off('zoom:changed', updateZoomLevel)
      updateZoomLevel.cancel() // Cancel any pending throttled calls
    }
  }, [canvas, updateZoomLevel])

  // Zoom to a specific level
  const zoomTo = useCallback(
    (level: number) => {
      if (!canvas || zoomingRef.current) return

      // Prevent concurrent zoom operations
      zoomingRef.current = true

      // Temporarily disable rendering during zoom calculation
      canvas.renderOnAddRemove = false

      const newZoom = level / 100
      const center = canvas.getCenter()

      // Use requestAnimationFrame for smoother visual updates
      requestAnimationFrame(() => {
        canvas.zoomToPoint(new fabric.Point(center.left, center.top), newZoom)

        // Re-enable rendering
        canvas.renderOnAddRemove = true

        // Notify about zoom change
        canvas.fire('zoom:changed')
        canvas.requestRenderAll()

        // Allow new zoom operations
        zoomingRef.current = false
      })
    },
    [canvas],
  )

  return {
    zoomLevel,
    zoomTo,
    setZoomLevel,
  }
}
