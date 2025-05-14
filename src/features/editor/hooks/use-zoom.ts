import { useCallback, useRef } from 'react'
import { fabric } from 'fabric'

interface UseZoomProps {
  canvas: fabric.Canvas | null
  container?: HTMLDivElement | null
}

export const useZoom = ({ canvas, container }: UseZoomProps) => {
  const zoomingRef = useRef(false)

  const zoomTo = useCallback(
    (level: number) => {
      if (!canvas || zoomingRef.current) return

      zoomingRef.current = true

      canvas.renderOnAddRemove = false

      const newZoom = level / 100
      const center = canvas.getCenter()

      requestAnimationFrame(() => {
        canvas.zoomToPoint(new fabric.Point(center.left, center.top), newZoom)

        canvas.renderOnAddRemove = true

        // canvas.fire('zoom:changed')
        canvas.requestRenderAll()
        zoomingRef.current = false
      })
    },
    [canvas],
  )

  const zoomToFill = useCallback(() => {
    if (!canvas || !container) return

    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight

    const canvasWidth = canvas.getWidth()
    const canvasHeight = canvas.getHeight()

    const scaleX = containerWidth / canvasWidth
    const scaleY = containerHeight / canvasHeight
    const scale = Math.min(scaleX, scaleY) * 0.9 // 90% of the container

    const newZoomLevel = Math.round(scale * 100)
    zoomTo(newZoomLevel)
  }, [canvas, container, zoomTo])

  const zoomIn = useCallback(() => {
    if (!canvas) return

    let zoomRatio = canvas.getZoom()
    zoomRatio += 0.05
    const center = canvas.getCenter()
    canvas.zoomToPoint(
      new fabric.Point(center.left, center.top),
      zoomRatio > 2 ? 2 : zoomRatio,
    )
  }, [canvas])

  const zoomOut = useCallback(() => {
    if (!canvas) return

    let zoomRatio = canvas.getZoom()
    zoomRatio -= 0.05
    const center = canvas.getCenter()
    canvas.zoomToPoint(
      new fabric.Point(center.left, center.top),
      zoomRatio < 0.2 ? 0.2 : zoomRatio,
    )
  }, [canvas])

  return {
    zoomTo,
    zoomToFill,
    zoomIn,
    zoomOut,
  }
}
